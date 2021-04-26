import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class FilterAccountParams {
  @ApiPropertyOptional({ description: 'Filter employee by name.' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter employee by approved by admin boolean.',
  })
  @IsBoolean()
  approvedByAdmin?: boolean;
}

export type FilterAccountInput = Partial<FilterAccountParams>;
