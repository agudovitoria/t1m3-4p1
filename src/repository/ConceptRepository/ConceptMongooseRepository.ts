/* tslint:disable:function-name */
import { ConceptRepository } from './ConceptRepository';
import TimeModel, { ConceptEntity } from '../../persistence/concept/ConceptEntity';

class ConceptMongooseRepository implements ConceptRepository {
    async FindAll(): Promise<ConceptEntity[]> {
        try {
            return await TimeModel.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Find(id: string): Promise<ConceptEntity> {
        try {
            return await TimeModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Insert(body: ConceptEntity): Promise<ConceptEntity> {
        try {
            return await TimeModel.create(body);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id: string): Promise<ConceptEntity> {
        try {
            return await TimeModel.remove({ _id: id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new ConceptMongooseRepository();
