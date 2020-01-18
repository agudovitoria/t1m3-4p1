import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import RabbitMQRepository from '../../repository/QueueRepository/RabbitMQRepository';
import AddTimeEvent from '../../domain/event/AddTimeEvent';
import { Logger } from '@nestjs/common';

@EventsHandler(AddTimeEvent)
export class AddTimeHandler implements IEventHandler<AddTimeEvent> {
  constructor(
    private readonly logger: Logger,
    private readonly repository: RabbitMQRepository,
    private readonly publisher: EventPublisher,
  ) {
    this.logger = new Logger(AddTimeHandler.name);
  }

  async handle(event: AddTimeEvent) {
    const { payload }: { payload: string } = event;
    this.logger.debug(`Handling event: ${payload}`);
    this.publisher.mergeObjectContext(JSON.parse(payload)).commit();
    await this.repository.publish(payload);
  }
}
