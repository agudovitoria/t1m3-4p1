import { Request, Response } from 'express';
import { ProductRepository } from '../repository/ProductRepository/ProductRepository';
import NotFoundException from '../exception/NotFoundException';
import Concept from '../domain/Concept';
import Exception from '../exception/Exception';
import ConceptRepositoryImpl from '../repository/ConceptRepository/ConceptRepositoryImpl';
import { ConceptEntity } from '../persistence/ConceptEntity';

class ConceptsController {
    private repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async findAllForUser(req: Request, res: Response): Promise<Response> {
        const { user, date }: any = req.query;

        console.log(`Requested times for user ${user} by date ${date}`);

        try {
            // TODO: Remove this when user be validated
            if (!user) {
                throw new NotFoundException(`User ${user} not found`);
            }

            const productEntities: ConceptEntity[] = await this.repository.FindAll();
            const responseTimes: Concept[] = productEntities
                .map((conceptEntity: ConceptEntity) => new Concept()
                    .fromEntity(conceptEntity));

            return res.status(200).json(responseTimes);
        } catch (exception) {
            const code: number = exception instanceof Exception ? exception.status : 500;
            const message: string = exception instanceof Exception ? exception.message : 'Generic exception';

            return res.status(code).json(message);
        }
    }

    async add(req: Request, res: Response): Promise<Response> {
        try {
            const { body }: any = req;
            const conceptToPersist: any = new Concept().fromJson(body).toJson();
            const conceptEntity: ConceptEntity = await this.repository.Insert(conceptToPersist);
            const concept: Concept = new Concept().fromEntity(conceptEntity);

            return res.status(200).json(concept);
        } catch (exception) {
            console.log('exception', exception);
            const code: number = exception instanceof Exception ? exception.status : 500;
            const message: String = exception instanceof Exception ? exception.message : 'Generic exception';

            return res.status(code).json(message);
        }
    }
}

export default new ConceptsController(ConceptRepositoryImpl);
