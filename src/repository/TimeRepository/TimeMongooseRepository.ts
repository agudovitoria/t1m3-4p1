/* tslint:disable:function-name */
import { TimeRepository } from './TimeRepository';
import { TimeEntity } from '../../persistence/time/TimeEntity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Time from '../../domain/Time';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TimeMongooseRepository implements TimeRepository {
    constructor(@InjectModel('Time') private readonly timeModel: Model<TimeEntity>) {}

    async findByUserAndDate(user: string, date: Date): Promise<TimeEntity[]> {
        return this.timeModel.find({ user, date }).exec();
    }

    async findById(id: string): Promise<TimeEntity> {
        return this.timeModel.findById(id).exec();
    }

    async insert(timeEntity: TimeEntity): Promise<TimeEntity> {
        const createdTime = new this.timeModel(timeEntity);

        return await createdTime.save();
    }

    async delete(id: string): Promise<any> {
        return this.timeModel.deleteOne({ _id: id }).exec();
    }
}
