import { GetTimeByUserAndDate } from '../../src/query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../src/usecase/time/AddTimeUseCase';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import TimeMongooseRepositoryMock from './mock/TimeMongooseRepositoryMock';
import * as supertest from 'supertest';
import { AppModule } from '../../src/app.module';

describe('/api/v1/times', () => {
  let app;
  let getTimeByUserAndDate: GetTimeByUserAndDate;
  let addTimeUseCase: AddTimeUseCase;

  const USER = '25dde6c8-fe83-4211-b3ca-ec1b5a15e19d';
  const DATE = new Date('2019-04-12');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
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

    app = module.createNestApplication();
    getTimeByUserAndDate = module.get<GetTimeByUserAndDate>(GetTimeByUserAndDate);
    addTimeUseCase = module.get<AddTimeUseCase>(AddTimeUseCase);

    await app.init();
  });

  describe('Initialization', () => {
    it('should be all defined', () => {
      expect(getTimeByUserAndDate).toBeDefined();
      expect(addTimeUseCase).toBeDefined();
    });
  });

  describe('GET /', () => {
    it('should call use case execute properly', async () => {
      jest.spyOn(getTimeByUserAndDate, 'execute');
      await supertest(app.getHttpServer())
        .get(`/times?user=${USER}&date=${DATE}`)
        .expect(200, []);

      expect(getTimeByUserAndDate.execute).toHaveBeenCalled();
    });

    it('should reject if no user in request', async () => {
      jest.spyOn(getTimeByUserAndDate, 'execute');
      await supertest(app.getHttpServer())
        .get(`/times?date=${DATE}`)
        .expect(400);

      expect(getTimeByUserAndDate.execute).toHaveBeenCalled();
    });
  });
});
