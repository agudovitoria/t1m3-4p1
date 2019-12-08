import { Logger, Module } from '@nestjs/common';
import { ConceptsController } from './ConceptsController';
import { FindConceptsByCriteria } from '../../query/concept/FindConceptsByCriteria';

@Module({
    imports: [
    ],
    controllers: [ConceptsController],
    providers: [
        Logger,
        FindConceptsByCriteria,
    ],
})
export class ConceptModule {
}
