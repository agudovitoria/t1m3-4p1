import { Logger, Module } from '@nestjs/common';
import { TimeController } from './TimeController';
import { FindTimesByCriteria } from '../../query/time/FindTimesByCriteria';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import { TimeEntity } from '../../persistence/TimeEntity';
import TimePostgresRepository from '../../repository/TimeRepository/TimePostgresRepository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntity])],
  controllers: [TimeController],
  providers: [
    Logger,
    FindTimesByCriteria,
    AddTimeUseCase,
    TimePostgresRepository,
  ],
})
export class TimeModule {
}
