import { Module, Provider } from '@nestjs/common';
import TimeMongooseRepository from './repository/TimeRepository/TimeMongooseRepository';
import { Model } from 'mongoose';
import { TimeEntity } from './persistence/time/TimeEntity';

const timeMongooseRepositoryProvider: Provider<any> = {
    provide: 'CONNECTION',
    useFactory: (timeModel: Model<TimeEntity>) => {
        return new TimeMongooseRepository(timeModel);
    },
};

@Module({
    providers: [timeMongooseRepositoryProvider],
})

export class TimeRepositoryProvider {
}
