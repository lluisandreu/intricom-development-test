import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppConfigService } from '../config/app-config.service';
import { ConfigModule } from '../config/config.module';
import { FsRepository } from '../common/persistence/fs-repository';
import { HotelBooking } from './entities/hotel-booking.entity';
import { HotelBookingsRepository } from './hotel-bookings.repository';

export const HOTEL_BOOKING_REPOSITORY = 'HOTEL_BOOKING_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([HotelBooking]), ConfigModule],
  providers: [
    HotelBookingsRepository,
    {
      provide: HOTEL_BOOKING_REPOSITORY,
      useFactory: (config: AppConfigService, typeOrmRepository: HotelBookingsRepository) =>
        config.dataType === 'FS'
          ? new FsRepository<HotelBooking>(join(config.fsFolder, 'HotelBooking'))
          : typeOrmRepository,
      inject: [AppConfigService, HotelBookingsRepository],
    },
  ],
  exports: [HOTEL_BOOKING_REPOSITORY],
})
export class HotelBookingsModule {}
