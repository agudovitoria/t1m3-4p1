import Time from '../../domain/Time';
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import TimeRequest from '../../domain/request/TimeRequest';
import { FindTimesByCriteria } from '../../query/time/FindTimesByCriteria';
import { AddTimeUseCase } from '../../usecase/time/AddTimeUseCase';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { validateOrReject } from 'class-validator';
import { TimeMapper } from '../../domain/mapper/TimeMapper';

@Controller('times')
export class TimeController {
  constructor(
    private readonly log: Logger,
    private readonly mapper: TimeMapper,
    private readonly getTimeByUserAndDate: FindTimesByCriteria,
    private readonly addTimeUseCase: AddTimeUseCase) {}

  /**
   * @api {get} /times/ Get all user timings by date
   * @apiName GetUserTimes
   * @apiGroup Times
   *
   * @apiParam {String} id Users unique ID.
   * @apiParam {Date} date Users timing date.
   *
   * @apiSuccess {String} user ID of the User.
   * @apiSuccess {Date} date Date of the User's timing.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user": "25dde6c8-fe83-4211-b3ca-ec1b5a15e19d",
   *       "date": "2019-12-01T20:25:35.649Z"
   *     }
   *
   * @apiError 404 Object UserNotFound The id of the User was not found.
   * @apiError 400 Object InvalidUserId The id of the User is not valid or was not sent.
   * @apiError 400 Object InvalidDate The date is not valid or was not sent.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   *
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   *    {
   *      "statusCode": 400,
   *      "error": "Bad Request",
   *      "message": [
   *        {
   *          "target": {
   *            "date": "2019-12-01T20:25:35.649Z"
   *          },
   *           "property": "user",
   *           "children": [],
   *           "constraints": {
   *             "isUuid": "user must be an UUID",
   *             "isNotEmpty": "user should not be empty"
   *           }
   *        }
   *      ]
   *    }
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   *    {
   *      "statusCode": 400,
   *      "error": "Bad Request",
   *      "message": [
   *        {
   *          "target": {
   *            "user": "25dde6c8-fe83-4211-b3ca-ec1b5a15e19d"
   *          },
   *           "property": "user",
   *           "children": [],
   *           "constraints": {
   *            "isNotEmpty": "date should not be empty"
   *           }
   *        }
   *      ]
   *    }
   */
  @Get()
  findByCriteria(@Query() criteria: TimeSearchCriteria): Promise<Time[]> {
    this.log.debug(`Requested get times for user ${criteria.user} by date ${criteria.date}`);

    return validateOrReject(criteria)
      .then(() => this.getTimeByUserAndDate.execute(criteria));

  }

  @Post()
  add(@Body() timeRequest: TimeRequest): Promise<Time> {
    this.log.debug(`Requested add new time for user ${timeRequest.user} by date ${timeRequest.date}`);

    return this.addTimeUseCase.execute(this.mapper.fromRequest(timeRequest));
  }
}
