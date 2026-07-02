import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { HotelsRepository } from '../../hotels/hotels.repository';
import { Client } from '../../clients/entities/client.entity';
import { ClientsRepository } from '../../clients/clients.repository';
import { HotelBooking } from '../../hotel-bookings/entities/hotel-booking.entity';
import { HotelBookingsRepository } from '../../hotel-bookings/hotel-bookings.repository';

describe('DB persistence (all entities)', () => {
  let moduleRef: TestingModule;
  let hotelsRepository: HotelsRepository;
  let clientsRepository: ClientsRepository;
  let hotelBookingsRepository: HotelBookingsRepository;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          // Base de datos en disco (no :memory:) para poder inspeccionar los registros tras el test
          database: 'test-database.sqlite',
          entities: [Hotel, Client, HotelBooking],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Hotel, Client, HotelBooking]),
      ],
      providers: [HotelsRepository, ClientsRepository, HotelBookingsRepository],
    }).compile();

    hotelsRepository = moduleRef.get(HotelsRepository);
    clientsRepository = moduleRef.get(ClientsRepository);
    hotelBookingsRepository = moduleRef.get(HotelBookingsRepository);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('creates one record of each entity in the database', async () => {
    const hotel = await hotelsRepository.create({
      name: 'Hotel Test',
      address: 'Main St 1',
    });
    const client = await clientsRepository.create({
      name: 'Client Test',
      address: 'Second St 2',
      phone: '+34600000000',
    });
    const hotelBooking = await hotelBookingsRepository.create({
      hotelId: hotel.id,
      clientId: client.id,
      name: 'Booking Test',
      address: 'Third St 3',
    });

    expect(hotel.id).toBeDefined();
    expect(client.id).toBeDefined();
    expect(hotelBooking.id).toBeDefined();

    await expect(hotelsRepository.findAll()).resolves.toContainEqual(hotel);
    await expect(clientsRepository.findAll()).resolves.toContainEqual(client);
    await expect(hotelBookingsRepository.findAll()).resolves.toContainEqual(hotelBooking);
  });

  it('updates an existing record and persists the change', async () => {
    const hotel = await hotelsRepository.create({
      name: 'Hotel Test',
      address: 'Main St 1',
    });

    const updated = await hotelsRepository.update(hotel.id, { name: 'Hotel Renamed' });

    expect(updated?.name).toBe('Hotel Renamed');
    await expect(hotelsRepository.findById(hotel.id)).resolves.toMatchObject({
      name: 'Hotel Renamed',
    });
  });
});
