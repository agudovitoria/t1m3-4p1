/* tslint:disable:function-name */
import { TimeRepository } from './TimeRepository';
import TimeModel, { TimeEntity } from '../../persistence/TimeEntity';

class TimeRepositoryImpl implements TimeRepository {
    async FindAllByUserAndDate(user: string, date: Date): Promise<TimeEntity[]> {
        try {
            return await TimeModel.find({ user, date });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Find(id: string): Promise<TimeEntity> {
        try {
            return await TimeModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Insert(body: TimeEntity): Promise<TimeEntity> {
        return await TimeModel.create(body);
    }

    async Delete(id: string): Promise<TimeEntity> {
        try {
            return await TimeModel.remove({ _id: id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new TimeRepositoryImpl();
