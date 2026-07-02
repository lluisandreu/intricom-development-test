import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateHotelBookingDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  hotelId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  clientId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address?: string;
}
