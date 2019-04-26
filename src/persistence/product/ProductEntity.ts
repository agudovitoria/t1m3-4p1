import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import uuid = require('uuid');

export interface ProductEntity extends Document {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
}

const ProductSchema: Schema = new Schema({
    _id: {
        type: String,
        default: ():string => uuid.v4()
    },
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'Product',
    versionKey: false
});

export default connections.db.model <ProductEntity>('ProductModel', ProductSchema);
