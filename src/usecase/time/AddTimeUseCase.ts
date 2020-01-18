import Time from '../../domain/Time';
import TimeUseCase from './TimeUseCase';
import { Injectable } from '@nestjs/common';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';
import { TimeMapper } from '../../domain/mapper/TimeMapper';
import { v4 } from 'uuid/interfaces';
import RabbitMQRepository from '../../repository/QueueRepository/RabbitMQRepository';
import Identifier from '../../domain/Identifier';

@Injectable()
export class AddTimeUseCase implements TimeUseCase {
  constructor(
    private readonly mapper: TimeMapper,
    private readonly repository: TimePostgresRepository,
    private readonly publisher: RabbitMQRepository,
  ) {
  }

  async execute(time: Time): Promise<Identifier> {
    return this.repository
      .create(this.mapper.toEntity(time))
      .then(({ id }: { id: v4 }) => {
        this.publisher.publish(`time.created ${id.toString()}`);

        return new Identifier(id);
      });
  }
}
