import { TimeEntity } from '../../persistence/TimeEntity';

export interface TimeRepository {
    FindAll(): Promise<TimeEntity[]>;
    Find(id: string): Promise<TimeEntity>;
    Insert(TimeEntity: TimeEntity): Promise<TimeEntity>;
    Delete(id: string): Promise<TimeEntity>;
}
