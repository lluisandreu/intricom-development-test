import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @IsPhoneNumber()
  phone: string;
}
