import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { FindOperator } from 'typeorm';
import { Status } from '../entities/project.entity';

export class FilterProjectParams {
  @ApiPropertyOptional({
    type: String,
    description: 'Filter projects by title.',
  })
  @IsString()
  title?: string | FindOperator<string>;

  @ApiPropertyOptional({
    minimum: 0,
    description: 'Filter projects by min revenue.',
  })
  @IsNumber()
  minRevenue?: number;

  @ApiPropertyOptional({
    minimum: 0,
    description: 'Filter projects by max revenue.',
  })
  @IsNumber()
  maxRevenue?: number;

  @ApiPropertyOptional({
    description: 'Filter projects by status.',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;

  revenue?: FindOperator<number>;
}

export type FilterProjectInput = Partial<FilterProjectParams>;
