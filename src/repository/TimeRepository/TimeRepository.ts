import { TimeEntity } from '../../persistence/time/TimeEntity';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';
import { v4String } from 'uuid/interfaces';

export interface TimeRepository {
    find(timeSearchCriteria: TimeSearchCriteria): Promise<TimeEntity[]>;
    findById(id: v4String): Promise<TimeEntity>;
    create(TimeEntity: TimeEntity): Promise<TimeEntity>;
    delete(id: v4String): Promise<TimeEntity>;
}
