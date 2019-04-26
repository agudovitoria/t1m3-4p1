import { ConceptEntity } from '../../persistence/concept/ConceptEntity';

export interface ConceptRepository {
    FindAll(): Promise<ConceptEntity[]>;
    Find(id: string): Promise<ConceptEntity>;
    Insert(ConceptEntity: ConceptEntity): Promise<ConceptEntity>;
    Delete(id: string): Promise<ConceptEntity>;
}
