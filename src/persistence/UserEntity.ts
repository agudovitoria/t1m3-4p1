import { v4String } from 'uuid/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: v4String;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: boolean;

  @Column({ name: 'first_surname', type: 'varchar' })
  firstSurname: boolean;

  @Column({ name: 'second_surname', type: 'varchar' })
  secondSurname: boolean;

  @Column({ name: 'email', type: 'varchar' })
  email: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}
