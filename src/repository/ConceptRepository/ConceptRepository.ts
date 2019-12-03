import { ConceptEntity } from '../../persistence/ConceptEntity';
import { v4String } from 'uuid/interfaces';
import ConceptSearchCriteria from '../../domain/request/ConceptSearchCriteria';

export interface ConceptRepository {
    find(conceptSearchCriteria: ConceptSearchCriteria): Promise<ConceptEntity[]>;
    findById(id: v4String): Promise<ConceptEntity>;
    create(conceptEntity: ConceptEntity): Promise<ConceptEntity>;
    delete(id: v4String): Promise<ConceptEntity>;
}
