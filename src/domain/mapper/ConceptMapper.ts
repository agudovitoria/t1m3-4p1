import DomainMapper from '../Domain';
import { ConceptEntity } from '../../persistence/ConceptEntity';
import Concept from '../Concept';

export class ConceptMapper implements DomainMapper<Concept, ConceptEntity> {
  fromEntity(userEntity: ConceptEntity): Concept {
    const concept = new Concept();
    concept.id = userEntity.id;
    concept.name = userEntity.name;

    return concept;
  }

  toEntity(domain: Concept): ConceptEntity {
    const conceptEntity = new ConceptEntity();
    conceptEntity.id = domain.id;
    conceptEntity.name = domain.name;

    return conceptEntity;
  }

  fromRequest(request: any): Concept {
    const conceptEntity = new ConceptEntity();
    conceptEntity.id = request.id;
    conceptEntity.name = request.name;

    return conceptEntity;
  }

  toResponse(domain: Concept): object {
    return {
      id: domain.id,
      name: domain.name,
    };
  }
}
