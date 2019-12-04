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
    this.id = conceptEntity.id;
    this.name = conceptEntity.name;

    return this;
  }

  toEntity(): ConceptEntity {
    return {
      id: this.id || v4(),
      name: this.name,
    } as ConceptEntity;
  }

  fromReques(request: any): Concept {
    const { id, name }: Concept = request;
    this.id = id;
    this.name = name || null;

    return this;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
