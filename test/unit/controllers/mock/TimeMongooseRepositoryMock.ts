import Time from '../../../../src/domain/Time';

export default class TimeMongooseRepositoryMock {
    async findByUserAndDate(): Promise<any> {
        return [];
    }

    async findById(): Promise<any> {
        return [];
    }

    async insert(time: Time): Promise<any> {
        return time;
    }

    async delete(): Promise<any> {
        return null;
    }
}
