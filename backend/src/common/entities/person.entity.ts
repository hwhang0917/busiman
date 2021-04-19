import { IsString, IsUrl, Length } from 'class-validator';
import { Column } from 'typeorm';
import { CoreEntity } from './core.entity';

export class PersonEntity extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsUrl()
  photoUrl?: string;

  @Column({ nullable: true })
  @IsString()
  contact?: string;

  @Column({ nullable: true })
  @IsString()
  title?: string;

  @Column({ nullable: true })
  @IsString()
  @Length(0, 120)
  introduction?: string;
}
