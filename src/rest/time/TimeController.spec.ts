import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './TimeController';
import { Logger } from '@nestjs/common';
import { GetTimeByUserAndDate } from '../../query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import { Connection } from 'mongoose';
import { TimeSchema } from '../../persistence/time/TimeSchema';
import Time from '../../domain/Time';

describe('TimeController /api/v1/times', () => {
    let timeController: TimeController;
    let getTimeByUserAndDate: GetTimeByUserAndDate;
    let addTimeUseCase: AddTimeUseCase;

    const timeProviders = [
        {
            provide: 'Time',
            useFactory: (connection: Connection) => connection.model('Time', TimeSchema),
            inject: ['DbConnectionToken'],
        },
    ];

    const USER = '25dde6c8-fe83-4211-b3ca-ec1b5a15e19d';
    const DATE = new Date('2019-04-12');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TimeController],
            providers: [
                Logger,
                GetTimeByUserAndDate,
                AddTimeUseCase,
                ...timeProviders,
            ],
        }).compile();

        timeController = module.get<TimeController>(TimeController);
        getTimeByUserAndDate = module.get<GetTimeByUserAndDate>(GetTimeByUserAndDate);
        addTimeUseCase = module.get<AddTimeUseCase>(AddTimeUseCase);
    });

    describe('GET /', () => {
        it('should be all defined', () => {
            expect(timeController).toBeDefined();
            expect(getTimeByUserAndDate).toBeDefined();
            expect(addTimeUseCase).toBeDefined();
        });

        it('should call usecase execute properly', async () => {
            jest.spyOn(getTimeByUserAndDate, 'execute').mockImplementation(() => Promise.resolve([]));

            expect(await getTimeByUserAndDate.execute).toHaveBeenCalled();

            timeController.findAllForUserAndDate(USER, DATE);
        });
    });
});
