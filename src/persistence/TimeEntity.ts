import { v4String } from 'uuid/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';
import { ProductEntity } from './ProductEntity';
import { ConceptEntity } from './ConceptEntity';

@Entity('times')
export class TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: v4String;

  @ManyToOne(() => UserEntity, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => ProductEntity, product => product.id, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => ConceptEntity, concept => concept.id, { eager: true })
  @JoinColumn({ name: 'concept_id' })
  concept: ConceptEntity;

  @Column({ type: 'int' })
  timing: number;

  @Column({ type: 'int' })
  validated: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}
