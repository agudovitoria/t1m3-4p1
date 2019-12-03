import { Injectable } from '@nestjs/common';
import ConceptsQuery from './ConceptsQuery';
import Concept from '../../domain/Concept';
import ConceptSearchCriteria from '../../domain/request/ConceptSearchCriteria';
import { ConceptEntity } from '../../persistence/ConceptEntity';
import ConceptMongooseRepository from '../../repository/ConceptRepository/ConceptMongooseRepository';

@Injectable()
export class FindConceptsByCriteria implements ConceptsQuery {
    constructor(
        private readonly repository: ConceptMongooseRepository) {
    }

    async execute(conceptSearchCriteria: ConceptSearchCriteria): Promise<Concept[]> {
        return this.repository.find(conceptSearchCriteria)
            .then(conceptEntities => conceptEntities
                .map((conceptEntity: ConceptEntity) => new Concept()
                  .fromEntity(conceptEntity)));
    }
}
