import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsRepository } from './clients.repository';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ConfigModule],
  controllers: [ClientsController],
  providers: [ClientsRepository, ClientsService],
})
export class ClientsModule {}
