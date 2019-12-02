import { Document } from 'mongoose';
import { v4String } from 'uuid/interfaces';

export interface TimeEntity extends Document {
    _id: v4String;
    user: v4String;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    product: v4String;
    concept: v4String;
    timing: number;
    validated: boolean;
}
