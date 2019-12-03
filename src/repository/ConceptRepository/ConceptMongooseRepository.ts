import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { v4String } from 'uuid/interfaces';
import { ConceptEntity } from '../../persistence/ConceptEntity';
import ConceptSearchCriteria from '../../domain/request/ConceptSearchCriteria';
import { ConceptRepository } from './ConceptRepository';

@Injectable()
export default class ConceptMongooseRepository implements ConceptRepository {
    constructor(@InjectModel('Concept') private readonly conceptModel: Model<ConceptEntity>) {}

    async find(conceptSearchCriteria: ConceptSearchCriteria): Promise<ConceptEntity[]> {
        return this.conceptModel.find(conceptSearchCriteria.getCriteria()).exec();
    }

    async findById(id: v4String): Promise<ConceptEntity> {
        return this.conceptModel.findById(id).exec();
    }

    async create(conceptEntity: ConceptEntity): Promise<ConceptEntity> {
        const createdTime = new this.conceptModel(conceptEntity);

        return await createdTime.save();
    }

    async delete(id: v4String): Promise<any> {
        return this.conceptModel.deleteOne({ _id: id }).exec();
    }
}
