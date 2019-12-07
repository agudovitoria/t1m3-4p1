import Time from '../../domain/Time';
import { TimeEntity } from '../../persistence/TimeEntity';
import TimeQuery from './TimeQuery';
import { Injectable } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';
import { TimeMapper } from '../../domain/mapper/TimeMapper';

@Injectable()
export class FindTimesByCriteria implements TimeQuery {
    constructor(
        private readonly repository: TimePostgresRepository) {
    }

    async execute(timeSearchCriteria: TimeSearchCriteria): Promise<Time[]> {
        return this.repository.find(timeSearchCriteria)
            .then(timeEntities => timeEntities
                .map((timeEntity: TimeEntity) => new TimeMapper()
                    .fromEntity(timeEntity)));
    }
}
