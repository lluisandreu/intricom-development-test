import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelsRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), ConfigModule],
  controllers: [HotelsController],
  providers: [HotelsRepository, HotelsService],
})
export class HotelsModule {}
