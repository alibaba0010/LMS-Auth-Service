import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

// import { Profile } from '../../profile/entities/profile.entity';
import { AbstractBaseEntity } from 'src/entities/base.entity';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'vendor',
}

@Entity({ name: 'users' })
export class User extends AbstractBaseEntity {
  @Column({ nullable: false })
  fullName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
