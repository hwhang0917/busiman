import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateClientInput {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  readonly isOrganization: boolean;

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
