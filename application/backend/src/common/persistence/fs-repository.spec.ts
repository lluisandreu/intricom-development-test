import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { FsRepository } from './fs-repository';

interface TestEntity {
  id: number;
  name: string;
  createdDate: Date;
}

describe('FsRepository', () => {
  let baseDir: string;
  let entityDir: string;

  beforeEach(() => {
    baseDir = mkdtempSync(join(tmpdir(), 'fs-repository-'));
    entityDir = join(baseDir, 'TestEntity');
  });

  afterEach(() => {
    rmSync(baseDir, { recursive: true, force: true });
  });

  it('creates the entity directory and a _metadata file on first use', () => {
    new FsRepository<TestEntity>(entityDir);

    expect(existsSync(entityDir)).toBe(true);

    const metadata = JSON.parse(readFileSync(join(entityDir, '_metadata.json'), 'utf-8'));
    expect(metadata).toEqual({ TOTAL_REGISTRIES: 0, LAST_INDEX: 0 });
  });

  it('does not reset metadata if the directory already exists', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);
    await repository.create({ name: 'first' });

    new FsRepository<TestEntity>(entityDir);

    const metadata = JSON.parse(readFileSync(join(entityDir, '_metadata.json'), 'utf-8'));
    expect(metadata.TOTAL_REGISTRIES).toBe(1);
  });

  it('allocates incrementing ids and updates metadata on create', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);

    const first = await repository.create({ name: 'Hotel A' });
    const second = await repository.create({ name: 'Hotel B' });

    expect(first.id).toBe(1);
    expect(second.id).toBe(2);

    const metadata = JSON.parse(readFileSync(join(entityDir, '_metadata.json'), 'utf-8'));
    expect(metadata).toEqual({ TOTAL_REGISTRIES: 2, LAST_INDEX: 2 });
  });

  it('finds a record by id', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);
    const created = await repository.create({ name: 'Hotel A' });

    const found = await repository.findById(created.id);

    expect(found).toEqual({ ...created, createdDate: created.createdDate.toISOString() });
  });

  it('returns null when findById does not match any record', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);

    const found = await repository.findById(999);

    expect(found).toBeNull();
  });

  it('returns all records sorted by id, ignoring the metadata file', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);
    await repository.create({ name: 'Hotel A' });
    await repository.create({ name: 'Hotel B' });

    const all = await repository.findAll();

    expect(all.map((record) => record.name)).toEqual(['Hotel A', 'Hotel B']);
  });

  it('updates an existing record while keeping its id', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);
    const created = await repository.create({ name: 'Hotel A' });

    const updated = await repository.update(created.id, { name: 'Hotel A renamed' });

    expect(updated).toEqual({
      id: created.id,
      name: 'Hotel A renamed',
      createdDate: created.createdDate.toISOString(),
    });
  });

  it('returns null when updating a non-existent id', async () => {
    const repository = new FsRepository<TestEntity>(entityDir);

    const updated = await repository.update(999, { name: 'Nope' });

    expect(updated).toBeNull();
  });
});
