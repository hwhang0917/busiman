import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Status } from '../entities/project.entity';

export class UpdateProjectInput {
  @ApiPropertyOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsNumber()
  readonly revenue?: number;

  @ApiPropertyOptional({ enum: Status, enumName: 'Status' })
  @IsEnum(Status)
  readonly status?: Status;
}
