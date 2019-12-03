import { ConceptEntity } from '../persistence/ConceptEntity';
import { v4String } from 'uuid/interfaces';
import v4 = require('uuid/v4');

export default class Concept {
  id: v4String;
  name: string;

  constructor() {
    this.id = null;
    this.name = null;
  }

  fromEntity(conceptEntity: ConceptEntity): Concept {
    this.id = conceptEntity._id;
    this.name = conceptEntity.name;

    return this;
  }

  toEntity(): ConceptEntity {
    return {
      _id: this.id || v4(),
      name: this.name,
    } as ConceptEntity;
  }

  fromReques(request: any): Concept {
    const { name }: Concept = request;
    this.name = name || null;

    return this;
  }

  toJson(): object {
    return { name: this.name };
  }
}
