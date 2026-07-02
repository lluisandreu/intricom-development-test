import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';
import { HotelBookingsRepository } from './hotel-bookings.repository';

export const HOTEL_BOOKING_REPOSITORY = 'HOTEL_BOOKING_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([HotelBooking])],
  providers: [{ provide: HOTEL_BOOKING_REPOSITORY, useClass: HotelBookingsRepository }],
  exports: [HOTEL_BOOKING_REPOSITORY],
})
export class HotelBookingsModule {}
