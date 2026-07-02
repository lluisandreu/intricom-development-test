import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelsRepository } from './hotels.repository';

export const HOTEL_REPOSITORY = 'HOTEL_REPOSITORY';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [{ provide: HOTEL_REPOSITORY, useClass: HotelsRepository }],
  exports: [HOTEL_REPOSITORY],
})
export class HotelsModule {}
