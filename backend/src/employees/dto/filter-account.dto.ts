import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { FindOperator } from 'typeorm';

export class FilterAccountParams {
  @ApiPropertyOptional({ description: 'Filter employee by name.' })
  @IsString()
  name?: string | FindOperator<string>;

  @ApiPropertyOptional({
    description: 'Filter employee by approved by admin boolean.',
  })
  @IsBoolean()
  approvedByAdmin?: boolean;
}

export type FilterAccountInput = Partial<FilterAccountParams>;
