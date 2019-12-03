import { TimeEntity } from '../persistence/TimeEntity';
import { v4String } from 'uuid/interfaces';
import v4 = require('uuid/v4');

export default class Time {
    id: v4String;
    user: v4String;
    date: Date;
    product: v4String;
    concept: v4String;
    timing: number;
    validated: boolean;

    constructor() {
        this.id = null;
        this.user = null;
        this.date = new Date();
        this.product = null;
        this.concept = null;
        this.timing = 0;
        this.validated = false;
    }

    fromEntity(timeEntity: TimeEntity): Time {
        this.id = timeEntity.id;
        this.user = timeEntity.user;
        this.date = timeEntity.date;
        this.product = timeEntity.product;
        this.concept = timeEntity.concept;
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
            user: this.user,
            date: this.date,
            product: this.product,
            concept: this.concept,
            timing: this.timing,
            validated: this.validated,
        };
    }
}
