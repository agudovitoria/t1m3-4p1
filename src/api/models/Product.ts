import * as connections from '../config/connection/connection';
import { Document, Schema, Types } from 'mongoose';

/**
 * @export
 * @interface IProductModel
 * @extends {Document}
 */
export interface IProductModel extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'productmodel',
    versionKey: false
}).pre('save', (next) => {
    // this will run before saving
    if (this._doc) {
        const doc: IProductModel = this._doc;
        const now: Date = new Date();

        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.updatedAt = now;
    }
    next();

    return this;
});

export default connections.db.model <IProductModel>('ProductModel', ProductSchema);
