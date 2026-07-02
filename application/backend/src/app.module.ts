import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/app-config.service';
import { ConfigModule } from './config/config.module';
import { HotelsModule } from './hotels/hotels.module';
import { ClientsModule } from './clients/clients.module';
import { HotelBookingsModule } from './hotel-bookings/hotel-bookings.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        type: 'better-sqlite3',
        database: 'database.sqlite',
        autoLoadEntities: true,
        // Solo se crea/sincroniza el esquema cuando DATA_TYPE=DB
        synchronize: config.dataType === 'DB',
      }),
    }),
    HotelsModule,
    ClientsModule,
    HotelBookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
