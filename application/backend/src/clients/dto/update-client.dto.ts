import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateClientDto {
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

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
