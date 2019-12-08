import Time from '../../domain/Time';
import TimeUseCase from './TimeUseCase';
import { Injectable } from '@nestjs/common';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';
import { TimeMapper } from '../../domain/mapper/TimeMapper';

@Injectable()
export class AddTimeUseCase implements TimeUseCase {
  constructor(
    private readonly mapper: TimeMapper,
    private readonly repository: TimePostgresRepository) {
  }

  async execute(time: Time): Promise<Time> {
    return this.repository
      .create(this.mapper.toEntity(time))
      .then(timeEntity => this.mapper.fromEntity(timeEntity));
  }
}
