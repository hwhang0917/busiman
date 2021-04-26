import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class FilterClientParams {
  @ApiPropertyOptional({ description: 'Filter client by name.' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter client by is organization boolean.',
  })
  @IsBoolean()
  isOrganization?: boolean;
}

export type FilterClientInput = Partial<FilterClientParams>;
