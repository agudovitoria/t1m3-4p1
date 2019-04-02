import * as connections from '../config/connection/connection';
import { Document, Schema } from 'mongoose';
import uuid = require('uuid');

export interface ConceptEntity extends Document {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
}

const ConceptSchema: Schema = new Schema({
    _id: {
        type: String,
        default: ():string => uuid.v4()
    },
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'Concept',
    versionKey: false
});

export default connections.db.model <ConceptEntity>('conceptModel', ConceptSchema);
