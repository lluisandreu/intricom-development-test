import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { HotelsModule } from './hotels/hotels.module';
import { ClientsModule } from './clients/clients.module';
import { HotelBookingsModule } from './hotel-bookings/hotel-bookings.module';

@Module({
  imports: [ConfigModule, HotelsModule, ClientsModule, HotelBookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
