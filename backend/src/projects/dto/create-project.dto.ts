import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Status } from '../entities/project.entity';

export class CreateProjectInput {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly revenue: number;

  @ApiProperty({ enum: Status, enumName: 'Status' })
  @IsEnum(Status)
  readonly status: Status;
}
