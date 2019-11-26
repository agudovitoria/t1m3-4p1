import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from '../../../src/rest/time/TimeController';
import { Logger } from '@nestjs/common';
import { GetTimeByUserAndDate } from '../../../src/query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../../src/usecase/time/AddTimeUseCase';
import TimeSearchCriteria from '../../../src/domain/request/TimeSearchCriteria';
import TimeMongooseRepositoryMock from './mock/TimeMongooseRepositoryMock';
import { getModelToken } from '@nestjs/mongoose';
import TimeRequest from '../../../src/domain/request/TimeRequest';
import Time from '../../../src/domain/Time';

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
          useValue: new TimeMongooseRepositoryMock(),
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

  describe('Initialization', () => {
    it('should be all defined', () => {
      expect(timeController).toBeDefined();
      expect(getTimeByUserAndDate).toBeDefined();
      expect(addTimeUseCase).toBeDefined();
    });
  });

  describe('findAllForUserAndDate', () => {
    it('should call use case execute properly', async () => {
      jest.spyOn(getTimeByUserAndDate, 'execute');
      const timeSearchCriteria = new TimeSearchCriteria();
      timeSearchCriteria.user = USER;
      timeSearchCriteria.date = DATE;
      await timeController.findAllForUserAndDate(timeSearchCriteria);
      expect(getTimeByUserAndDate.execute).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('should call use case execute properly', async () => {
      jest.spyOn(addTimeUseCase, 'execute');
      const timeRequest: TimeRequest = new TimeRequest();
      timeRequest.user = '25dde6c8-fe83-4211-b3ca-ec1b5a15e19d';
      timeRequest.date = new Date();
      timeRequest.product = 'test product';
      timeRequest.concept = 'test concept';
      timeRequest.timing = 2;
      timeRequest.validated = false;

      await timeController.add(timeRequest);

      expect(addTimeUseCase.execute).toHaveBeenCalled();
    });
  });
});
