import { TimeEntity } from '../../persistence/TimeEntity';

export interface TimeRepository {
    FindAllByUserAndDate(user: string, date: Date): Promise<TimeEntity[]>;
    Find(id: string): Promise<TimeEntity>;
    Insert(TimeEntity: TimeEntity): Promise<TimeEntity>;
    Delete(id: string): Promise<TimeEntity>;
}
