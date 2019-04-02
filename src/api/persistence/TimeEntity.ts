import * as connections from '../config/connection/connection';
import { Document, Schema } from 'mongoose';
import uuid = require('uuid');
import { IProductModel } from '../models/Product';
import Exception from '../exception/Exception';

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

const TimeSchema: Schema = new Schema({
    _id: {
        type: String,
        default: (): string => uuid.v4()
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    timing: {
        type: Number,
        required: true
    },
    validated: {
        type: Boolean,
        required: true
    }
}, {
    collection: 'Time',
    versionKey: false,
    timestamps: true
}).pre('save', (next) => {
    // this will run before saving
    if (this._doc) {
        const doc: IProductModel = this._doc;

        doc.validate((err) => {
            if (err) {
                throw new Exception(422, 'Cannot validate Time model');
            }
        });
    }
    next();

    return this;
});

export default connections.db.model <TimeEntity>('TimeModel', TimeSchema);
