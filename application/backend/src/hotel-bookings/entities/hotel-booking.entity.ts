import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class HotelBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @IsPositive()
  hotelId: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @IsInt()
  @IsPositive()
  clientId: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
