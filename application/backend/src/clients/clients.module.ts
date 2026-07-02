import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsRepository } from './clients.repository';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [{ provide: CLIENT_REPOSITORY, useClass: ClientsRepository }],
  exports: [CLIENT_REPOSITORY],
})
export class ClientsModule {}
