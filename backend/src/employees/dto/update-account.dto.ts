import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateAccountInput {
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
