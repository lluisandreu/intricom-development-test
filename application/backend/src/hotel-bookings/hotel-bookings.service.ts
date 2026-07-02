import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import type { Repository } from '../common/interfaces/repository.interface';
import { FsRepository } from '../common/persistence/fs-repository';
import { AppConfigService } from '../config/app-config.service';
import { HotelBooking } from './entities/hotel-booking.entity';
import { HotelBookingsRepository } from './hotel-bookings.repository';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';

@Injectable()
export class HotelBookingsService {
  private readonly hotelBookingRepository: Repository<HotelBooking>;

  constructor(config: AppConfigService, typeOrmRepository: HotelBookingsRepository) {
    this.hotelBookingRepository =
      config.dataType === 'FS'
        ? new FsRepository<HotelBooking>(join(config.fsFolder, 'HotelBooking'))
        : typeOrmRepository;
  }

  findAll(): Promise<HotelBooking[]> {
    return this.hotelBookingRepository.findAll();
  }

  async findOne(id: number): Promise<HotelBooking> {
    const hotelBooking = await this.hotelBookingRepository.findById(id);
    if (!hotelBooking) {
      throw new NotFoundException(`HotelBooking ${id} not found`);
    }
    return hotelBooking;
  }

  create(dto: CreateHotelBookingDto): Promise<HotelBooking> {
    return this.hotelBookingRepository.create(dto);
  }

  async update(id: number, dto: UpdateHotelBookingDto): Promise<HotelBooking> {
    const hotelBooking = await this.hotelBookingRepository.update(id, dto);
    if (!hotelBooking) {
      throw new NotFoundException(`HotelBooking ${id} not found`);
    }
    return hotelBooking;
  }
}
