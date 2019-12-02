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
        return this.repository
          .create(time.toEntity())
            .then(timeEntity => new Time().fromEntity(timeEntity));
    }
}
