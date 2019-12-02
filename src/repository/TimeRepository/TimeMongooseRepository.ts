import { TimeRepository } from './TimeRepository';
import { TimeEntity } from '../../persistence/time/TimeEntity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Time from '../../domain/Time';
import { Injectable } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { v4String } from 'uuid/interfaces';

@Injectable()
export default class TimeMongooseRepository implements TimeRepository {
    constructor(@InjectModel('Time') private readonly timeModel: Model<TimeEntity>) {}

    async find(timeSearchCriteria: TimeSearchCriteria): Promise<TimeEntity[]> {
        return this.timeModel.find(timeSearchCriteria.getCriteria()).exec();
    }

    async findById(id: v4String): Promise<TimeEntity> {
        return this.timeModel.findById(id).exec();
    }

    async create(timeEntity: TimeEntity): Promise<TimeEntity> {
        const createdTime = new this.timeModel(timeEntity);

        return await createdTime.save();
    }

    async delete(id: v4String): Promise<any> {
        return this.timeModel.deleteOne({ _id: id }).exec();
    }
}
