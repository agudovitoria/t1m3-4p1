import Time from '../../domain/Time';
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import TimeRequest from '../../domain/request/TimeRequest';
import { GetTimeByUserAndDate } from '../../query/time/GetTimeByUserAndDate';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';

@Controller('times')
export class TimeController {
  constructor(
    private readonly log: Logger,
    private readonly getTimeByUserAndDate: GetTimeByUserAndDate,
    private readonly addTimeUseCase: AddTimeUseCase) {
  }

  @Get()
  findAllForUserAndDate(@Query() criteria: TimeSearchCriteria): Promise<Time[]> {
    this.log.debug(`Requested get times for user ${criteria.user} by date ${criteria.date}`);

    return this.getTimeByUserAndDate.execute(criteria);
  }

  @Post()
  add(@Body() timeRequest: TimeRequest): Promise<Time> {
    this.log.debug(`Requested add new time for user ${timeRequest.user} by date ${timeRequest.date}`);

    return this.addTimeUseCase.execute(new Time().fromRequest(timeRequest));
  }
}

