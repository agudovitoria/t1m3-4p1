import * as uuid from 'uuid';
import * as moment from 'moment';
import { IsDateString, validate } from 'class-validator';
import TimeRequest from '../../../src/domain/request/TimeRequest';

describe('TimeRequest validations (unit)', () => {
    const USER = uuid.v4();
    const DATE = moment()
        .startOf('day')
        .toDate()
        .toISOString();
    const PRODUCT = uuid.v4();
    const CONCEPT = uuid.v4();
    const TIMING = 2;
    const VALIDATED = false;

    const fullfilledTimeRequest = () => {
        const timeRequest = new TimeRequest();
        timeRequest.user = USER;
        timeRequest.date = DATE;
        timeRequest.product = PRODUCT;
        timeRequest.concept = CONCEPT;
        timeRequest.timing = TIMING;
        timeRequest.validated = VALIDATED;

        return timeRequest;
    };

    it('should respond without error if request is valid', async () => {
        const timeRequest = fullfilledTimeRequest();
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(0);
    });

    it('should respond with error if user is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.user;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const userFieldError = errors.pop();
        expect(userFieldError.property).toBe('user');
        expect(userFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if user is not a valid UUID', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.user = 'user';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const userFieldError = errors.pop();
        expect(userFieldError.property).toBe('user');
        expect(userFieldError.constraints.isUuid).toBeDefined();
    });

    it('should respond with error if date is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.date;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const dateFieldError = errors.pop();
        expect(dateFieldError.property).toBe('date');
        expect(dateFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if date is not a valid ISO date', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.date = '17-01-2011';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const dateFieldError = errors.pop();
        expect(dateFieldError.property).toBe('date');
        expect(dateFieldError.constraints.isDateString).toBeDefined();
    });

    it('should respond with error if product is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.product;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const productFieldError = errors.pop();
        expect(productFieldError.property).toBe('product');
        expect(productFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if product is not a valid UUID', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.product = 'product';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const productFieldError = errors.pop();
        expect(productFieldError.property).toBe('product');
        expect(productFieldError.constraints.isUuid).toBeDefined();
    });

    it('should respond with error if concept is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.concept;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const conceptFieldError = errors.pop();
        expect(conceptFieldError.property).toBe('concept');
        expect(conceptFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if concept is not a valid UUID', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.concept = 'concept';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const conceptFieldError = errors.pop();
        expect(conceptFieldError.property).toBe('concept');
        expect(conceptFieldError.constraints.isUuid).toBeDefined();
    });

    it('should respond with error if timing is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.timing;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const timingFieldError = errors.pop();
        expect(timingFieldError.property).toBe('timing');
        expect(timingFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if timing is not a valid number', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.timing = null;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const timingFieldError = errors.pop();
        expect(timingFieldError.property).toBe('timing');
        expect(timingFieldError.constraints.isNumber).toBeDefined();
    });

    it('should respond with error if validated is empty', async () => {
        const timeRequest = fullfilledTimeRequest();
        delete timeRequest.validated;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const validatedFieldError = errors.pop();
        expect(validatedFieldError.property).toBe('validated');
        expect(validatedFieldError.constraints.isNotEmpty).toBeDefined();
    });

    it('should respond with error if validated is not a valid boolean', async () => {
        const timeRequest = fullfilledTimeRequest();
        timeRequest.validated = null;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const validatedFieldError = errors.pop();
        expect(validatedFieldError.property).toBe('validated');
        expect(validatedFieldError.constraints.isBoolean).toBeDefined();
    });
});
