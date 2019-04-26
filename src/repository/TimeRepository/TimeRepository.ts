import { TimeEntity } from '../../persistence/time/TimeEntity';

export interface TimeRepository {
    findByUserAndDate(user: string, date: Date): Promise<TimeEntity[]>;
    findById(id: string): Promise<TimeEntity>;
    insert(TimeEntity: TimeEntity): Promise<TimeEntity>;
    delete(id: string): Promise<TimeEntity>;
}
