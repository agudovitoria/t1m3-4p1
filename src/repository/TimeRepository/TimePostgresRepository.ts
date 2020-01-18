import { TimeRepository } from './TimeRepository';
import { TimeEntity } from '../../persistence/TimeEntity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { v4 } from 'uuid/interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class TimePostgresRepository implements TimeRepository {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(TimeEntity)
    private readonly repository: Repository<TimeEntity>,
  ) {
    this.logger = new Logger(TimePostgresRepository.name);
  }

  async find(timeSearchCriteria: TimeSearchCriteria): Promise<TimeEntity[]> {
    this.logger.debug(`Retrieving data for criteria: ${JSON.stringify(timeSearchCriteria.getCriteria())}`);
    return this.repository.find(timeSearchCriteria.getCriteria());
  }

  async findById(id: v4): Promise<TimeEntity> {
    this.logger.debug(`Retrieving data for id ${id}`, 'QUERY::TimePostgresRepository.findById');
    return this.repository.findOne(id.toString());
  }

  async create(timeEntity: TimeEntity): Promise<TimeEntity> {
    return this.repository.insert(timeEntity)
      .then(({ generatedMaps }) => generatedMaps.pop() as TimeEntity);
  }

  async update(timeEntity: TimeEntity): Promise<TimeEntity> {
    return this.repository.remove(timeEntity);
  }

  async delete(timeEntity: TimeEntity): Promise<any> {
    return this.repository.remove(timeEntity);
  }
}
