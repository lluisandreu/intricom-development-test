import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import type { Repository } from '../common/interfaces/repository.interface';
import { FsRepository } from '../common/persistence/fs-repository';
import { AppConfigService } from '../config/app-config.service';
import { Hotel } from './entities/hotel.entity';
import { HotelsRepository } from './hotels.repository';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  private readonly hotelRepository: Repository<Hotel>;

  constructor(config: AppConfigService, typeOrmRepository: HotelsRepository) {
    this.hotelRepository =
      config.dataType === 'FS'
        ? new FsRepository<Hotel>(join(config.fsFolder, 'Hotel'))
        : typeOrmRepository;
  }

  findAll(): Promise<Hotel[]> {
    return this.hotelRepository.findAll();
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findById(id);
    if (!hotel) {
      throw new NotFoundException(`Hotel ${id} not found`);
    }
    return hotel;
  }

  create(dto: CreateHotelDto): Promise<Hotel> {
    return this.hotelRepository.create(dto);
  }

  async update(id: number, dto: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.hotelRepository.update(id, dto);
    if (!hotel) {
      throw new NotFoundException(`Hotel ${id} not found`);
    }
    return hotel;
  }
}
