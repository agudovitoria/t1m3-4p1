import Time from '../../domain/Time';
import { TimeEntity } from '../../persistence/TimeEntity';
import TimeQuery from './TimeQuery';
import { Inject, Injectable, Logger } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';
import { TimeMapper } from '../../domain/mapper/TimeMapper';

@Injectable()
export class FindTimesByCriteria implements TimeQuery {
  constructor(
    private readonly logger: Logger,
    private readonly mapper: TimeMapper,
    private readonly repository: TimePostgresRepository) {
    this.logger = new Logger(FindTimesByCriteria.name);
  }

  async execute(timeSearchCriteria: TimeSearchCriteria): Promise<Time[]> {
    this.logger.debug(`Retrieving data for user ${timeSearchCriteria.user}`);
    return this.repository.find(timeSearchCriteria)
      .then(timeEntities => timeEntities
        .map((timeEntity: TimeEntity) => this.mapper.fromEntity(timeEntity)));
  }
}
