import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;
}
