import { Logger, Module } from '@nestjs/common';
import { TimeController } from './rest/time/TimeController';
import { FindTimesByCriteria } from './query/time/FindTimesByCriteria';
import { AddTimeUseCase } from './usecase/time/AddTimeUseCase';
import { TimeEntity } from './persistence/TimeEntity';
import TimePostgresRepository from './repository/TimeRepository/TimePostgresRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeMapper } from './domain/mapper/TimeMapper';
import { ConceptMapper } from './domain/mapper/ConceptMapper';
import { ProductMapper } from './domain/mapper/ProductMapper';
import { UserMapper } from './domain/mapper/UserMapper';
import RabbitMQRepository from './repository/QueueRepository/RabbitMQRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeEntity]),
  ],
  controllers: [TimeController],
  providers: [
    Logger,
    ConceptMapper,
    ProductMapper,
    UserMapper,
    TimeMapper,
    FindTimesByCriteria,
    AddTimeUseCase,
    TimePostgresRepository,
    RabbitMQRepository,
  ],
})
export class TimeModule {
}
