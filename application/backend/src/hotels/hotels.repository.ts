import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Repository } from '../common/interfaces/repository.interface';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository implements Repository<Hotel> {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: TypeOrmRepository<Hotel>,
  ) {}

  findAll(): Promise<Hotel[]> {
    return this.hotelRepository.find();
  }

  findById(id: number): Promise<Hotel | null> {
    return this.hotelRepository.findOneBy({ id });
  }

  create(data: Partial<Hotel>): Promise<Hotel> {
    const hotel = this.hotelRepository.create(data);
    return this.hotelRepository.save(hotel);
  }

  async update(id: number, data: Partial<Hotel>): Promise<Hotel | null> {
    const hotel = await this.findById(id);
    if (!hotel) {
      return null;
    }

    Object.assign(hotel, data);
    return this.hotelRepository.save(hotel);
  }
}
