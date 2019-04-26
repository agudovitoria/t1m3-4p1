import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { when } from 'jest-when';
import { TimeModule } from '../../../src/rest/time/Time.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GetTimeByUserAndDate } from '../../../src/query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../../src/usecase/time/AddTimeUseCase';
import any = jasmine.any;

describe('TimeController (e2e)', () => {
    let app: INestApplication;

    const USER = uuid.v4();
    const DATE = moment()
        .startOf('day')
        .toISOString()
        .toString();
    const PRODUCT = uuid.v4();
    const CONCEPT = uuid.v4();
    const TIMING = 2;
    const VALIDATED = false;

    const execute = jest.fn();
    const getTimeByUserAndDate = { execute };
    const addTimeUseCase = { execute };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TimeModule],
        }).overrideProvider(GetTimeByUserAndDate)
            .useValue(getTimeByUserAndDate)
            .overrideProvider(AddTimeUseCase)
            .useValue(addTimeUseCase)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should respond with error code 400 when GET /times with no user field', () => {
        when(getTimeByUserAndDate.execute)
            .calledWith(undefined, any(Date))
            .mockRejectedValue(null);

        return request(app.getHttpServer())
            .get(`/times?date=${DATE}`)
            .expect(400);
    });

    it('should respond with error code 400 when GET /times with no date field', () => {
        return request(app.getHttpServer())
            .get(`/times?user=${USER}`)
            .expect(400);
    });

    it('should respond with code 200 when GET /times with valid data', () => {
        when(getTimeByUserAndDate.execute)
            .calledWith(any(String), any(Date))
            .mockResolvedValue([]);

        return request(app.getHttpServer())
            .get(`/times?user=${USER}&date=${DATE}`)
            .expect(200);
    });

    it('should respond with error code 400 when POST /times with no date field in request body', () => {
        return request(app.getHttpServer())
            .post('/times')
            .send({ user: USER })
            .expect(400);
    });

    it('should respond with error code 400 when POST /times with invalid request', () => {
        return request(app.getHttpServer())
            .post('/times')
            .send({ date: DATE })
            .expect(400);
    });

    it('should respond with code 201 when POST /times with valid data', () => {
        when(getTimeByUserAndDate.execute)
            .calledWith(any(String), any(Date))
            .mockResolvedValue({});

        const data = {
            user: USER,
            date: DATE,
            product: PRODUCT,
            concept: CONCEPT,
            timing: TIMING,
            validated: VALIDATED,
        };

        return request(app.getHttpServer())
            .post('/times')
            .send(data)
            .expect(201);
    });
});
