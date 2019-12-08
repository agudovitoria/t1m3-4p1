import { v4 } from 'uuid/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: v4;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'first_surname', type: 'varchar' })
  firstSurname: string;

  @Column({ name: 'second_surname', type: 'varchar' })
  secondSurname: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}
