import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ConceptMongooseRepository from '../../repository/ConceptRepository/ConceptMongooseRepository';
import { ConceptSchema } from '../../persistence/concept/ConceptSchema';
import { ConceptsController } from './ConceptsController';
import { FindConceptsByCriteria } from '../../query/concept/find-concepts-by-criteria';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Concept', schema: ConceptSchema }]),
    ],
    controllers: [ConceptsController],
    providers: [
        Logger,
        FindConceptsByCriteria,
        // ConceptRepositoryProvider,
        ConceptMongooseRepository,
    ],
})
export class ConceptModule {
}
