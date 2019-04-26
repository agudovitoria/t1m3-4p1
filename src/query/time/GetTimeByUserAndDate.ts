import Time from '../../domain/Time';
import { TimeEntity } from '../../persistence/time/TimeEntity';
import TimeQuery from './TimeQuery';
import { Injectable } from '@nestjs/common';
import TimeMongooseRepository from '../../repository/TimeRepository/TimeMongooseRepository';

@Injectable()
export class GetTimeByUserAndDate implements TimeQuery {
    constructor(
        private readonly repository: TimeMongooseRepository) {
    }

    async execute(user: string, date: Date): Promise<Time[]> {
        return this.repository.findByUserAndDate(user, date)
            .then(timeEntities => timeEntities
                .map((timeEntity: TimeEntity) => new Time()
                    .fromEntity(timeEntity)));
    }
}
