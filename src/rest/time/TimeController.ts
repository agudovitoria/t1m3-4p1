import Time from '../../domain/Time';
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import TimeRequest from '../../domain/request/TimeRequest';
import { GetTimeByUserAndDate } from '../../query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import NotFoundException from '../../exception/NotFoundException';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';

@Controller('times')
export class TimeController {
    constructor(
        private readonly  log: Logger,
        private readonly getTimeByUserAndDate: GetTimeByUserAndDate,
        private readonly addTimeUseCase: AddTimeUseCase) {
    }

    @Get()
    findAllForUserAndDate(@Query() searchCriteria: TimeSearchCriteria): Promise<Time[]> {
        const { user, date } = searchCriteria;

        this.log.debug(`Requested get times for user ${user} by date ${date}`);

        return this.getTimeByUserAndDate.execute(user, date);
    }

    @Post()
    add(@Body() timeRequest: TimeRequest): Promise<Time> {
        const { user, date } = timeRequest;

        this.log.debug(`Requested add new time for user ${user} by date ${date}`);

        const timeToAdd = new Time().fromRequest(timeRequest);

        return this.addTimeUseCase.execute(timeToAdd);
    }
}

