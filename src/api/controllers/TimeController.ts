import { Request, Response } from 'express';
import { TimeEntity } from '../persistence/TimeEntity';
import { TimeRepository } from '../repository/TimeRepository/TimeRepository';
import TimeRepositoryImpl from '../repository/TimeRepository/TimeRepositoryImpl';
import Time from '../domain/Time';
import UnprocessableRequestException from '../exception/UnprocessableRequestException';

const HTTP_OK: number = 200;

class TimeController {
    private repository: TimeRepository;

    constructor(repository: TimeRepository) {
        this.repository = repository;
    }

    async findAllForUserAndDate(req :Request, res :Response) :Promise<Response> {
        const { user = null, date = null } : { user? :string, date? :Date} = req.query;

        // TODO: Remove this when user be validated
        if (!user) {
            console.error(`Requested times without user field by date ${date}`);
            throw new UnprocessableRequestException('user');
        }
        
        if (!date) {
            console.error(`Requested times for user ${user} without date field`);
            throw new UnprocessableRequestException('date');
        }
        
        console.debug(`Requested times for user ${user} by date ${date}`);

        const timeEntities :TimeEntity[] = await this.repository.FindAllByUserAndDate(user, date);
        const responseTimes :Time[] = timeEntities
            .map((timeEntity :TimeEntity) => new Time()
                .fromEntity(timeEntity));

        return res.status(HTTP_OK).json(responseTimes);
    }

    async add(req :Request, res :Response) :Promise<Response> {
        const { user = null, date = null } : { user? :string, date? :Date} = req.body;

        if (!user) {
            console.error(`Requested times without user field by date ${date}`);
            throw new UnprocessableRequestException('user');
        }

        if (!date) {
            console.error(`Requested times for user ${user} without date field`);
            throw new UnprocessableRequestException('date');
        }

        console.debug(`Requested add new time for user ${user} by date ${date}`);

        const { body } :any = req;
        const timeToPersist :any = new Time().fromJson(body).toJson();
        const timeEntity :TimeEntity = await this.repository.Insert(timeToPersist);
        const time :Time = new Time().fromEntity(timeEntity);

        console.debug(`New time added for user ${user} by date ${date}`, time);

        return res.status(HTTP_OK).json(time);
    }
}

export default new TimeController(TimeRepositoryImpl);
