import Concept from '../../domain/Concept';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { FindConceptsByCriteria } from '../../query/concept/FindConceptsByCriteria';
import { validateOrReject } from 'class-validator';

@Controller('concepts')
export class ConceptsController {
    constructor(
      private readonly log: Logger,
      private readonly findConceptsByCriteria: FindConceptsByCriteria) {}

    @Get()
    findByCriteria(@Query() criteria: TimeSearchCriteria): Promise<Concept[]> {
        this.log.debug(`Requested get concepts for user ${criteria.user} by date ${criteria.date}`);

        return validateOrReject(criteria)
          .then(() => this.findConceptsByCriteria.execute(criteria));
    }
}
