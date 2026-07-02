import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HotelBookingsService } from './hotel-bookings.service';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';

@Controller('hotel-bookings')
export class HotelBookingsController {
  constructor(private readonly hotelBookingsService: HotelBookingsService) {}

  @Get()
  findAll() {
    return this.hotelBookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotelBookingsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateHotelBookingDto) {
    return this.hotelBookingsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHotelBookingDto) {
    return this.hotelBookingsService.update(id, dto);
  }
}
