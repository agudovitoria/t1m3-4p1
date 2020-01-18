import { Injectable, Logger } from '@nestjs/common';
import QueueRepository from './QueueRepository';
import { RMQService } from 'nestjs-rmq';

const TIMES_QUEUE_NAME: string = 'times';
@Injectable()
export default class RabbitMQRepository implements QueueRepository {
  constructor(
    private readonly logger: Logger,
    private readonly rmqService: RMQService,
  ) {
    this.logger = new Logger(RabbitMQRepository.name);
  }

  async publish(message: string) {
    this.logger.debug(`Publishing on queue [${TIMES_QUEUE_NAME}]: ${message}`);

    await this.rmqService.send<string, string>(process.env.AMQP_TOPIC_TIMES, message)
      .then(response => this.logger.debug(`Successfully published ${message} on queue [${TIMES_QUEUE_NAME}]:`, response))
      .catch(error => this.logger.error(`Cannot publish ${message} on queue [${TIMES_QUEUE_NAME}]:`, error));
  }
}
