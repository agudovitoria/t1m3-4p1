import { TimeEntity } from '../persistence/TimeEntity';

export default class Time {
    id: string;
    user: string;
    date: string;
    product: string;
    concept: string;
    timing: number;
    validated: boolean;

    constructor() {
        this.id = null;
        this.user = null;
        this.date = null;
        this.product = null;
        this.concept = null;
        this.timing = 0;
        this.validated = false;
    }

    fromEntity(timeEntity: TimeEntity) :Time {
        this.id = timeEntity._id;
        this.user = timeEntity.user;
        this.date = timeEntity.date.toString();
        this.product = timeEntity.product;
        this.concept = timeEntity.concept;
        this.timing = timeEntity.timing;
        this.validated = timeEntity.validated;

        return this;
    }

    fromJson(request: any) :Time {
        const { user, date, product, concept, timing,  validated } :Time = request;
        this.user = user || null;
        this.date = date || null;
        this.product = product || null;
        this.concept = concept || null;
        this.timing = timing || 0;
        this.validated = validated || false;

        return this;
    }

    toJson() :object {
        return {
            user: this.user,
            date: this.date,
            product: this.product,
            concept: this.concept,
            timing: this.timing,
            validated: this.validated
        };
    }
}
