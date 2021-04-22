import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateAccountInput {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiPropertyOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly password?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly photoUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly contact?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly introduction?: string;
}
