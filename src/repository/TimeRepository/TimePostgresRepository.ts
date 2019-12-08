import { TimeRepository } from './TimeRepository';
import { TimeEntity } from '../../persistence/TimeEntity';
import { Injectable } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { v4 } from 'uuid/interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class TimePostgresRepository implements TimeRepository {
  constructor(
    @InjectRepository(TimeEntity)
    private readonly repository: Repository<TimeEntity>,
  ) {}

  async find(timeSearchCriteria: TimeSearchCriteria): Promise<TimeEntity[]> {
    return this.repository.find(timeSearchCriteria.getCriteria());
  }

  async findById(id: v4): Promise<TimeEntity> {
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
