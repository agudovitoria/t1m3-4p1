import Time from '../../domain/Time';
import { TimeEntity } from '../../persistence/time/TimeEntity';
import TimeQuery from './TimeQuery';
import { Injectable } from '@nestjs/common';
import TimeMongooseRepository from '../../repository/TimeRepository/TimeMongooseRepository';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';

@Injectable()
export class GetTimeByUserAndDate implements TimeQuery {
    constructor(
        private readonly repository: TimeMongooseRepository) {
    }

    async execute(timeSearchCriteria: TimeSearchCriteria): Promise<Time[]> {
        return this.repository.find(timeSearchCriteria)
            .then(timeEntities => timeEntities
                .map((timeEntity: TimeEntity) => new Time()
                    .fromEntity(timeEntity)));
    }
}
