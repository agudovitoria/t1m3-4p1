import { ConceptEntity } from '../persistence/ConceptEntity';

export default class Concept {
    id: string;
    name: string;

    constructor() {
        this.id = null;
        this.name = null;
    }

    fromEntity(conceptEntity: ConceptEntity) :Concept {
        this.id = conceptEntity._id;
        this.name = conceptEntity.name;

        return this;
    }

    fromJson(request: any) :Concept {
        const { name } :Concept = request;
        this.name = name || null;

        return this;
    }

    toJson() :object {
        return { name: this.name };
    }
}
