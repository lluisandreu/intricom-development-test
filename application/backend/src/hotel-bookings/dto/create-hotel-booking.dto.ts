import { IsInt, IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';

export class CreateHotelBookingDto {
  @IsInt()
  @IsPositive()
  hotelId: number;

  @IsInt()
  @IsPositive()
  clientId: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;
}
