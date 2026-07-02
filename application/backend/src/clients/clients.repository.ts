import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Repository } from '../common/interfaces/repository.interface';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsRepository implements Repository<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: TypeOrmRepository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findById(id: number): Promise<Client | null> {
    return this.clientRepository.findOneBy({ id });
  }

  create(data: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(data);
    return this.clientRepository.save(client);
  }

  async update(id: number, data: Partial<Client>): Promise<Client | null> {
    const client = await this.findById(id);
    if (!client) {
      return null;
    }

    Object.assign(client, data);
    return this.clientRepository.save(client);
  }
}
