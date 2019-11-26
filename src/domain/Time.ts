import { TimeEntity } from '../persistence/time/TimeEntity';
import { IsUUID } from 'class-validator';

export default class Time {
    @IsUUID()
    id: string;
    @IsUUID()
    user: string;
    date: Date;
    @IsUUID()
    product: string;
    @IsUUID()
    concept: string;
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
        this.id = timeEntity._id;
        this.user = timeEntity.user;
        this.date = timeEntity.date;
        this.product = timeEntity.product;
        this.concept = timeEntity.concept;
        this.timing = timeEntity.timing;
        this.validated = timeEntity.validated;

        return this;
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
