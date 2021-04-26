import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateDocumentInput {
  @ApiPropertyOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsString()
  readonly documentUrl?: string;

  @ApiPropertyOptional()
  @IsNumber()
  readonly contributorId?: number;
}
