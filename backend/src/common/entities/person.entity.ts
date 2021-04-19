import { Column } from 'typeorm';
import { CoreEntity } from './core.entity';

export class PersonEntity extends CoreEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  introduction?: string;
}
