import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Repository } from '../common/interfaces/repository.interface';
import { HotelBooking } from './entities/hotel-booking.entity';

@Injectable()
export class HotelBookingsRepository implements Repository<HotelBooking> {
  constructor(
    @InjectRepository(HotelBooking)
    private readonly hotelBookingRepository: TypeOrmRepository<HotelBooking>,
  ) {}

  findAll(): Promise<HotelBooking[]> {
    return this.hotelBookingRepository.find();
  }

  findById(id: number): Promise<HotelBooking | null> {
    return this.hotelBookingRepository.findOneBy({ id });
  }

  create(data: Partial<HotelBooking>): Promise<HotelBooking> {
    const hotelBooking = this.hotelBookingRepository.create(data);
    return this.hotelBookingRepository.save(hotelBooking);
  }

  async update(id: number, data: Partial<HotelBooking>): Promise<HotelBooking | null> {
    const hotelBooking = await this.findById(id);
    if (!hotelBooking) {
      return null;
    }

    Object.assign(hotelBooking, data);
    return this.hotelBookingRepository.save(hotelBooking);
  }
}
