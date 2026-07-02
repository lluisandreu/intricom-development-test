import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import type { Repository } from '../common/interfaces/repository.interface';
import { FsRepository } from '../common/persistence/fs-repository';
import { AppConfigService } from '../config/app-config.service';
import { Client } from './entities/client.entity';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  private readonly clientRepository: Repository<Client>;

  constructor(config: AppConfigService, typeOrmRepository: ClientsRepository) {
    this.clientRepository =
      config.dataType === 'FS'
        ? new FsRepository<Client>(join(config.fsFolder, 'Client'))
        : typeOrmRepository;
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return client;
  }

  create(dto: CreateClientDto): Promise<Client> {
    return this.clientRepository.create(dto);
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.update(id, dto);
    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return client;
  }
}
