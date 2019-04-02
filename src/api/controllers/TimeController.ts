import { Request, Response } from 'express';
import { TimeEntity } from '../persistence/TimeEntity';
import { TimeRepository } from '../repository/TimeRepository/TimeRepository';
import TimeRepositoryImpl from '../repository/TimeRepository/TimeRepositoryImpl';
import Time from '../domain/Time';
import NotFoundException from '../exception/NotFoundException';

const HTTP_OK: number = 200;

class TimeController {
    private repository: TimeRepository;

    constructor(repository: TimeRepository) {
        this.repository = repository;
    }

    async findAllForUserAndDate(req: Request, res: Response): Promise<Response> {
        const { user, date }: any = req.query;

        console.log(`Requested times for user ${user} by date ${date}`);

        // TODO: Remove this when user be validated
        if (!user) {
            throw new NotFoundException(`User ${user} not found`);
        }

        const timeEntities: TimeEntity[] = await this.repository.FindAll();
        const responseTimes: Time[] = timeEntities
            .map((timeEntity: TimeEntity) => new Time()
                .fromEntity(timeEntity));

        return res.status(HTTP_OK).json(responseTimes);
    }

    async add(req: Request, res: Response): Promise<Response> {
        const { user, date }: any = req.body;

        console.log(`Requested add new time for user ${user} by date ${date}`);

        const { body }: any = req;
        const timeToPersist: any = new Time().fromJson(body).toJson();
        const timeEntity: TimeEntity = await this.repository.Insert(timeToPersist);
        const time: Time = new Time().fromEntity(timeEntity);

        return res.status(HTTP_OK).json(time);
    }
}

export default new TimeController(TimeRepositoryImpl);
