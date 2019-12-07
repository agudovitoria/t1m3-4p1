import DomainMapper from '../Domain';
import { TimeEntity } from '../../persistence/TimeEntity';
import Time from '../Time';
import { UserMapper } from './UserMapper';
import { ProductMapper } from './ProductMapper';
import { ConceptMapper } from './ConceptMapper';

export class TimeMapper implements DomainMapper<Time, TimeEntity> {
  fromEntity(timeEntity: TimeEntity): Time {
    const time = new Time();
    time.id = timeEntity.id;
    time.user = new UserMapper().fromEntity(timeEntity.user);
    time.date = timeEntity.date;
    time.product = new ProductMapper().fromEntity(timeEntity.product);
    time.concept = new ConceptMapper().fromEntity(timeEntity.concept);
    time.timing = timeEntity.timing;
    time.validated = timeEntity.validated;

    return time;
  }

  toEntity(domain: Time): TimeEntity {
    const timeEntity = new TimeEntity();
    timeEntity.id = domain.id;
    timeEntity.user = new UserMapper().toEntity(domain.user);
    timeEntity.date = domain.date;
    timeEntity.product = new ProductMapper().toEntity(domain.product);
    timeEntity.concept = new ConceptMapper().toEntity(domain.concept);
    timeEntity.timing = domain.timing;
    timeEntity.validated = domain.validated;

    return timeEntity;
  }

  fromRequest(request: any): Time {
    const time = new Time();
    time.id = request.id;
    time.user = new UserMapper().fromEntity(request.user);
    time.date = request.date;
    time.product = new ProductMapper().fromEntity(request.product);
    time.concept = new ConceptMapper().fromEntity(request.concept);
    time.timing = request.timing;
    time.validated = request.validated;

    return time;
  }

  toResponse(domain: Time): object {
    return {
      id: domain.id,
      user: new UserMapper().toResponse(domain.user),
      date: domain.date,
      product: new ProductMapper().toResponse(domain.product),
      concept: new ConceptMapper().toResponse(domain.concept),
      timing: domain.timing,
      validated: domain.validated,
    };
  }
}
