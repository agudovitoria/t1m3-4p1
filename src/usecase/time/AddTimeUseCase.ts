import Time from '../../domain/Time';
import TimeUseCase from './TimeUseCase';
import { Injectable } from '@nestjs/common';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';

@Injectable()
export class AddTimeUseCase implements TimeUseCase {
    constructor(
        private readonly repository: TimePostgresRepository) {
    }

    async execute(time: Time): Promise<Time> {
        return this.repository
          .create(time.toEntity())
            .then(timeEntity => new Time().fromEntity(timeEntity));
    }
}
