import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppConfigService } from '../config/app-config.service';
import { ConfigModule } from '../config/config.module';
import { FsRepository } from '../common/persistence/fs-repository';
import { Client } from './entities/client.entity';
import { ClientsRepository } from './clients.repository';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ConfigModule],
  providers: [
    ClientsRepository,
    {
      provide: CLIENT_REPOSITORY,
      useFactory: (config: AppConfigService, typeOrmRepository: ClientsRepository) =>
        config.dataType === 'FS'
          ? new FsRepository<Client>(join(config.fsFolder, 'Client'))
          : typeOrmRepository,
      inject: [AppConfigService, ClientsRepository],
    },
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientsModule {}
