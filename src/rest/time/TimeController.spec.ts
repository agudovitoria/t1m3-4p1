import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './TimeController';
import { Logger } from '@nestjs/common';
import { GetTimeByUserAndDate } from '../../query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import TimeMongooseRepositoryMock from './mock/TimeMongooseRepositoryMock';
import { getModelToken } from '@nestjs/mongoose';
import TimeRepositoryProviderMock from './mock/TimeRepositoryProviderMock';

describe('TimeController /api/v1/times', () => {
  let timeController: TimeController;
  let getTimeByUserAndDate: GetTimeByUserAndDate;
  let addTimeUseCase: AddTimeUseCase;

  const USER = '25dde6c8-fe83-4211-b3ca-ec1b5a15e19d';
  const DATE = new Date('2019-04-12');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [
        Logger,
        GetTimeByUserAndDate,
        AddTimeUseCase,
        {
          provide: getModelToken('Time'),
          useValue: new TimeRepositoryProviderMock(),
        },
        {
          provide: 'TimeMongooseRepository',
          useValue: new TimeMongooseRepositoryMock(),
        },
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

    it('should call use case execute properly', async () => {
      jest.spyOn(getTimeByUserAndDate, 'execute');
      await timeController.findAllForUserAndDate(new TimeSearchCriteria(USER, DATE));
      expect(getTimeByUserAndDate.execute).toHaveBeenCalled();
    });
  });
});
