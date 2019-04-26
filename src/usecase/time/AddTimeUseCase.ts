import Time from '../../domain/Time';
import { TimeRepository } from '../../repository/TimeRepository/TimeRepository';
import TimeUseCase from './TimeUseCase';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddTimeUseCase implements TimeUseCase {
    constructor(
        @InjectModel('Time')
        private readonly repository: TimeRepository) {
    }

    async execute(time: Time): Promise<Time> {
        const timeToPersist: any = new Time().toJson();

        return this.repository.insert(timeToPersist)
            .then(timeEntity => new Time().fromEntity(timeEntity));
    }
}
