import { AbstractBaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile extends AbstractBaseEntity {
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  phoneNumber: string;
  @Column({ nullable: true })
  dob: Date;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  photo: string;
}
