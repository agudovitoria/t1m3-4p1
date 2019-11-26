import { Logger, Module } from '@nestjs/common';
import { TimeController } from './TimeController';
import { GetTimeByUserAndDate } from '../../query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import { TimeRepositoryProvider } from '../../time-repository-provider';
import TimeMongooseRepository from '../../repository/TimeRepository/TimeMongooseRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSchema } from '../../persistence/time/TimeSchema';

@Module({
    imports: [
      // TODO: Pasar a variables de entorno de configuracion
        MongooseModule.forRoot('mongodb://localhost:27017/t1m3-4pp', { useNewUrlParser: true, useUnifiedTopology: true }),
        MongooseModule.forFeature([{ name: 'Time', schema: TimeSchema }]),
    ],
    controllers: [TimeController],
    providers: [
        Logger,
        GetTimeByUserAndDate,
        AddTimeUseCase,
        TimeRepositoryProvider,
        TimeMongooseRepository,
    ],
})
export class TimeModule {
}
