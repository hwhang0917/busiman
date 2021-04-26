import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindOperator } from 'typeorm';

export class FilterDocumentParams {
  @ApiPropertyOptional({
    type: String,
    description: 'Filter documents by title.',
  })
  title?: string | FindOperator<string>;
}

export type FilterDocumentInput = Partial<FilterDocumentParams>;
