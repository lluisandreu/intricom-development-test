import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppConfigService } from '../config/app-config.service';
import { ConfigModule } from '../config/config.module';
import { FsRepository } from '../common/persistence/fs-repository';
import { Hotel } from './entities/hotel.entity';
import { HotelsRepository } from './hotels.repository';

export const HOTEL_REPOSITORY = 'HOTEL_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), ConfigModule],
  providers: [
    HotelsRepository,
    {
      provide: HOTEL_REPOSITORY,
      useFactory: (config: AppConfigService, typeOrmRepository: HotelsRepository) =>
        config.dataType === 'FS'
          ? new FsRepository<Hotel>(join(config.fsFolder, 'Hotel'))
          : typeOrmRepository,
      inject: [AppConfigService, HotelsRepository],
    },
  ],
  exports: [HOTEL_REPOSITORY],
})
export class HotelsModule {}
