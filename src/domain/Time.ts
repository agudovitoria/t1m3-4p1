import { TimeEntity } from '../persistence/TimeEntity';
import { v4String } from 'uuid/interfaces';
import v4 = require('uuid/v4');
import User from './User';
import Product from './Product';
import Concept from './Concept';

export default class Time {
    id: v4String;
    user: User;
    date: Date;
    product: Product;
    concept: Concept;
    timing: number;
    validated: boolean;

    fromEntity(timeEntity: TimeEntity): Time {
        this.id = timeEntity.id;
        this.user = new User().fromEntity(timeEntity.user);
        this.product = new Product().fromEntity(timeEntity.product);
        this.concept = new Concept().fromEntity(timeEntity.concept);
        this.date = timeEntity.date;
        this.timing = timeEntity.timing;
        this.validated = timeEntity.validated;

        return this;
    }

    toEntity(): TimeEntity {
        return {
            id: this.id || v4(),
            user: this.user,
            date: this.date,
            product: this.product,
            concept: this.concept,
            timing: this.timing,
            validated: this.validated,
        } as TimeEntity;
    }

    fromRequest(request: any): Time {
        const { user, date, product, concept, timing, validated }: Time = request;
        this.user = user || null;
        this.date = date || new Date();
        this.product = product || null;
        this.concept = concept || null;
        this.timing = timing || 0;
        this.validated = validated || false;

        return this;
    }

    toJson(): object {
        return {
            user: this.user.toJson(),
            date: this.date,
            product: this.product.toJson(),
            concept: this.concept.toJson(),
            timing: this.timing,
            validated: this.validated,
        };
    }
}
