import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';
import { HotelBookingsRepository } from './hotel-bookings.repository';
import { HotelBookingsService } from './hotel-bookings.service';
import { HotelBookingsController } from './hotel-bookings.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([HotelBooking]), ConfigModule],
  controllers: [HotelBookingsController],
  providers: [HotelBookingsRepository, HotelBookingsService],
})
export class HotelBookingsModule {}
