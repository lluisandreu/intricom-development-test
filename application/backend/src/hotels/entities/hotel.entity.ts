import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class Hotel {
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

  @CreateDateColumn()
  createdDate: Date;
}
