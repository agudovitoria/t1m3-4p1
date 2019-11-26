import Time from '../../domain/Time';
import TimeSearchCriteria from '../../domain/request/TimeSearchCriteria';

export default interface TimeQuery {
  execute(timeSearchCriteria: TimeSearchCriteria): Promise<Time[]>;
}
