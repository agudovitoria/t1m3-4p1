import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid/interfaces';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: v4;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}
