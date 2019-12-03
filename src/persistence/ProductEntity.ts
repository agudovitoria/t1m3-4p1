import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4String } from 'uuid/interfaces';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: v4String;

    @Column({type: 'varchar'})
    name: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt?: Date;

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt?: Date;
}
