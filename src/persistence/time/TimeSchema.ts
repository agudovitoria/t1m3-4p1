import { Schema } from 'mongoose';
import uuid = require('uuid');

export const TimeSchema: Schema = new Schema({
    _id: {
        type: String,
        default: (): string => uuid.v4(),
    },
    user: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    concept: {
        type: String,
        required: true,
    },
    timing: {
        type: Number,
        required: true,
    },
    validated: {
        type: Boolean,
        required: true,
    },
}, {
    collection: 'Time',
    versionKey: false,
    timestamps: true,
});
