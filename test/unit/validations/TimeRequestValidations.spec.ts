import * as uuid from 'uuid';
import * as moment from 'moment';
import { validate } from 'class-validator';
import TimeRequest from '../../../src/domain/request/TimeRequest';

describe('TimeRequest validations (unit)', () => {
    const USER = uuid.v4();
    const DATE = moment()
        .startOf('day')
        .toDate();
    const PRODUCT = uuid.v4();
    const CONCEPT = uuid.v4();
    const TIMING = 2;
    const VALIDATED = false;

    const fulfilledTimeRequest = () => {
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
        const timeRequest = fulfilledTimeRequest();
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(0);
    });

    it('should respond with error if user is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.user;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const userFieldError = errors.pop();
        expect(userFieldError.property).toBe('user');
        expect(userFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if user is not a valid UUID', async () => {
        const timeRequest = fulfilledTimeRequest();
        timeRequest.user = 'user';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const userFieldError = errors.pop();
        expect(userFieldError.property).toBe('user');
        expect(userFieldError.constraints).toHaveProperty('isUuid');
    });

    it('should respond with error if date is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.date;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const dateFieldError = errors.pop();
        expect(dateFieldError.property).toBe('date');
        expect(dateFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if product is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.product;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const productFieldError = errors.pop();
        expect(productFieldError.property).toBe('product');
        expect(productFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if product is not a valid UUID', async () => {
        const timeRequest = fulfilledTimeRequest();
        timeRequest.product = 'product';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const productFieldError = errors.pop();
        expect(productFieldError.property).toBe('product');
        expect(productFieldError.constraints).toHaveProperty('isUuid');
    });

    it('should respond with error if concept is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.concept;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const conceptFieldError = errors.pop();
        expect(conceptFieldError.property).toBe('concept');
        expect(conceptFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if concept is not a valid UUID', async () => {
        const timeRequest = fulfilledTimeRequest();
        timeRequest.concept = 'concept';
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const conceptFieldError = errors.pop();
        expect(conceptFieldError.property).toBe('concept');
        expect(conceptFieldError.constraints).toHaveProperty('isUuid');
    });

    it('should respond with error if timing is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.timing;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const timingFieldError = errors.pop();
        expect(timingFieldError.property).toBe('timing');
        expect(timingFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if timing is not a valid number', async () => {
        const timeRequest = fulfilledTimeRequest();
        timeRequest.timing = null;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const timingFieldError = errors.pop();
        expect(timingFieldError.property).toBe('timing');
        expect(timingFieldError.constraints).toHaveProperty('isNumber');
    });

    it('should respond with error if validated is empty', async () => {
        const timeRequest = fulfilledTimeRequest();
        delete timeRequest.validated;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const validatedFieldError = errors.pop();
        expect(validatedFieldError.property).toBe('validated');
        expect(validatedFieldError.constraints).toHaveProperty('isNotEmpty');
    });

    it('should respond with error if validated is not a valid boolean', async () => {
        const timeRequest = fulfilledTimeRequest();
        timeRequest.validated = null;
        const errors = await validate(timeRequest);
        expect(errors.length).toBe(1);
        const validatedFieldError = errors.pop();
        expect(validatedFieldError.property).toBe('validated');
        expect(validatedFieldError.constraints).toHaveProperty('isBoolean');
    });
});
