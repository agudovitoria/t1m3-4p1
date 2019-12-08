import { Injectable } from '@nestjs/common';
import ConceptsQuery from './ConceptsQuery';
import Concept from '../../domain/Concept';
import ConceptSearchCriteria from '../../domain/request/ConceptSearchCriteria';
import { ConceptEntity } from '../../persistence/ConceptEntity';
import ConceptMongooseRepository from '../../repository/ConceptRepository/ConceptMongooseRepository';
import { ConceptMapper } from '../../domain/mapper/ConceptMapper';

@Injectable()
export class FindConceptsByCriteria implements ConceptsQuery {
  constructor(
    private readonly  mapper: ConceptMapper,
    private readonly repository: ConceptMongooseRepository) {
  }

  async execute(conceptSearchCriteria: ConceptSearchCriteria): Promise<Concept[]> {
    return this.repository.find(conceptSearchCriteria)
      .then(conceptEntities => conceptEntities
        .map((conceptEntity: ConceptEntity) => this.mapper.fromEntity(conceptEntity)));
  }
}
