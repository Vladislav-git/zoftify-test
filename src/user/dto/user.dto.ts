import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

export class DeleteUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
