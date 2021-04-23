import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDocumentInput {
  @ApiPropertyOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly documentUrl?: string;
}
