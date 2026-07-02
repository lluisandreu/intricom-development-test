import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateHotelDto {
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
