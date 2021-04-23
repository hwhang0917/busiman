import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateClientInput {
  @ApiPropertyOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  readonly isOrganization?: boolean;

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

  @ApiPropertyOptional()
  @IsString()
  readonly website?: string;
}
