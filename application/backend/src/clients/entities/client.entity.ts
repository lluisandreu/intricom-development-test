import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  @IsPhoneNumber()
  phone: string;

  @CreateDateColumn()
  createdDate: Date;
}
