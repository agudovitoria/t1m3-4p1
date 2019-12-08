import DomainMapper from '../Domain';
import { TimeEntity } from '../../persistence/TimeEntity';
import Time from '../Time';
import { UserMapper } from './UserMapper';
import { ProductMapper } from './ProductMapper';
import { ConceptMapper } from './ConceptMapper';
import { Inject } from '@nestjs/common';

export class TimeMapper implements DomainMapper<Time, TimeEntity> {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
    @Inject(ConceptMapper)
    private readonly conceptMapper: ConceptMapper,
    @Inject(ProductMapper)
    private readonly productMapper: ProductMapper,
  ) {
  }

  fromEntity(timeEntity: TimeEntity): Time {
    const time = new Time();
    time.id = timeEntity.id;
    time.user = timeEntity.user;
    time.date = timeEntity.date;
    time.product = timeEntity.product;
    time.concept = timeEntity.concept;
    time.timing = timeEntity.timing;
    time.validated = timeEntity.validated;

    return time;
  }

  toEntity(domain: Time): TimeEntity {
    const timeEntity = new TimeEntity();
    if (domain.id) {
      timeEntity.id = domain.id;
    }
    // TODO: Comprobar que existe con un findOne antes
    timeEntity.user = domain.user;
    timeEntity.date = domain.date;
    // TODO: Comprobar que existe con un findOne antes
    timeEntity.product = domain.product;
    // TODO: Comprobar que existe con un findOne antes
    timeEntity.concept = domain.concept;
    timeEntity.timing = domain.timing;
    timeEntity.validated = domain.validated;

    return timeEntity;
  }

  fromRequest(request: any): Time {
    const time = new Time();
    time.id = request.id;
    time.user = request.user;
    time.date = request.date;
    time.product = request.product;
    time.concept = request.concept;
    time.timing = request.timing;
    time.validated = request.validated;

    return time;
  }

  toResponse(domain: Time): object {
    return {
      id: domain.id,
      user: domain.user,
      date: domain.date,
      product: domain.product,
      concept: domain.concept,
      timing: domain.timing,
      validated: domain.validated,
    };
  }
}
