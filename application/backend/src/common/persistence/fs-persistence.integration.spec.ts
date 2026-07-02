import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { FsRepository } from './fs-repository';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Client } from '../../clients/entities/client.entity';
import { HotelBooking } from '../../hotel-bookings/entities/hotel-booking.entity';

describe('FsRepository (all entities)', () => {
  let fsFolder: string;

  beforeEach(() => {
    fsFolder = mkdtempSync(join(tmpdir(), 'fs-folder-'));
  });

  afterEach(() => {
    rmSync(fsFolder, { recursive: true, force: true });
  });

  it('creates one subdirectory, a _metadata file and one record file per entity', async () => {
    const hotelRepository = new FsRepository<Hotel>(join(fsFolder, 'Hotel'));
    const clientRepository = new FsRepository<Client>(join(fsFolder, 'Client'));
    const hotelBookingRepository = new FsRepository<HotelBooking>(
      join(fsFolder, 'HotelBooking'),
    );

    const hotel = await hotelRepository.create({
      name: 'Hotel Test',
      address: 'Main St 1',
    });
    const client = await clientRepository.create({
      name: 'Client Test',
      address: 'Second St 2',
      phone: '+34600000000',
    });
    const hotelBooking = await hotelBookingRepository.create({
      hotelId: hotel.id,
      clientId: client.id,
      name: 'Booking Test',
      address: 'Third St 3',
    });

    for (const entity of ['Hotel', 'Client', 'HotelBooking']) {
      expect(existsSync(join(fsFolder, entity))).toBe(true);

      const metadata = JSON.parse(
        readFileSync(join(fsFolder, entity, '_metadata.json'), 'utf-8'),
      );
      expect(metadata).toEqual({ TOTAL_REGISTRIES: 1, LAST_INDEX: 1 });
    }

    const storedHotel = JSON.parse(
      readFileSync(join(fsFolder, 'Hotel', `${hotel.id}.json`), 'utf-8'),
    );
    expect(storedHotel).toEqual({ ...hotel, createdDate: hotel.createdDate.toISOString() });

    const storedClient = JSON.parse(
      readFileSync(join(fsFolder, 'Client', `${client.id}.json`), 'utf-8'),
    );
    expect(storedClient).toEqual({ ...client, createdDate: client.createdDate.toISOString() });

    const storedHotelBooking = JSON.parse(
      readFileSync(join(fsFolder, 'HotelBooking', `${hotelBooking.id}.json`), 'utf-8'),
    );
    expect(storedHotelBooking).toEqual({
      ...hotelBooking,
      createdDate: hotelBooking.createdDate.toISOString(),
    });
  });
});
