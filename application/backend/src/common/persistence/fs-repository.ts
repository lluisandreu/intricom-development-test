import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Repository } from '../interfaces/repository.interface';

interface FsMetadata {
  TOTAL_REGISTRIES: number;
  LAST_INDEX: number;
}

const METADATA_FILE = '_metadata.json';

export class FsRepository<T extends { id: number }> implements Repository<T> {
  constructor(private readonly entityDir: string) {
    this.ensureInitialized();
  }

  async findAll(): Promise<T[]> {
    const files = await readdir(this.entityDir);
    const recordFiles = files.filter((file) => file !== METADATA_FILE);

    const records = await Promise.all(
      recordFiles.map((file) => this.readRecordFile(join(this.entityDir, file))),
    );

    return records.sort((a, b) => a.id - b.id);
  }

  async findById(id: number): Promise<T | null> {
    try {
      return await this.readRecordFile(this.recordPath(id));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async create(data: Partial<T>): Promise<T> {
    const metadata = await this.readMetadata();
    const id = metadata.LAST_INDEX + 1;
    const record = { ...data, id } as T;

    await writeFile(this.recordPath(id), JSON.stringify(record, null, 2));
    await this.writeMetadata({
      TOTAL_REGISTRIES: metadata.TOTAL_REGISTRIES + 1,
      LAST_INDEX: id,
    });

    return record;
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    const updated = { ...existing, ...data, id };
    await writeFile(this.recordPath(id), JSON.stringify(updated, null, 2));

    return updated;
  }

  private ensureInitialized(): void {
    if (!existsSync(this.entityDir)) {
      mkdirSync(this.entityDir, { recursive: true });
    }
    if (!existsSync(this.metadataPath)) {
      const metadata: FsMetadata = { TOTAL_REGISTRIES: 0, LAST_INDEX: 0 };
      writeFileSync(this.metadataPath, JSON.stringify(metadata, null, 2));
    }
  }

  private async readRecordFile(path: string): Promise<T> {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content) as T;
  }

  private async readMetadata(): Promise<FsMetadata> {
    const content = await readFile(this.metadataPath, 'utf-8');
    return JSON.parse(content) as FsMetadata;
  }

  private async writeMetadata(metadata: FsMetadata): Promise<void> {
    await writeFile(this.metadataPath, JSON.stringify(metadata, null, 2));
  }

  private get metadataPath(): string {
    return join(this.entityDir, METADATA_FILE);
  }

  private recordPath(id: number): string {
    return join(this.entityDir, `${id}.json`);
  }
}
