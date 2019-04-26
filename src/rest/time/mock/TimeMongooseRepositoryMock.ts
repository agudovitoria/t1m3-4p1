export default class TimeMongooseRepositoryMock {
    constructor(private readonly timeModel: any) {}

    async findByUserAndDate(): Promise<any> {
        return [];
    }

    async findById(): Promise<any> {
        return [];
    }

    async insert(): Promise<any> {
        return null;
    }

    async delete(): Promise<any> {
        return null;
    }
}
