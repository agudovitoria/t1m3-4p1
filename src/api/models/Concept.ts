import * as connections from '../config/connection/connection';
import { Document, Schema, Types } from 'mongoose';

/**
 * @export
 * @interface IConceptModel
 * @extends {Document}
 */
export interface IConceptModel extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
}

const ConceptSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    collection: 'conceptmodel',
    versionKey: false
}).pre('save', (next) => {
    // this will run before saving
    if (this._doc) {
        const doc: IConceptModel = this._doc;
        const now: Date = new Date();

        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.updatedAt = now;
    }
    next();

    return this;
});

export default connections.db.model <IConceptModel>('ConceptModel', ConceptSchema);
