import { v4 } from 'uuid/interfaces';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { ProductEntity } from './ProductEntity';
import { ConceptEntity } from './ConceptEntity';

@Entity('times')
export class TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: v4;

  @Column({ name: 'user_id', type: 'uuid' })
  user: UserEntity;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'product_id', type: 'uuid' })
  product: ProductEntity;

  @Column({ name: 'concept_id', type: 'uuid' })
  concept: ConceptEntity;

  @Column({ type: 'int' })
  timing: number;

  @Column({ type: 'int' })
  validated: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
