import { Document } from 'mongoose';

export interface TimeEntity extends Document {
    _id: string;
    user: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    product: string;
    concept: string;
    timing: number;
    validated: boolean;
}
