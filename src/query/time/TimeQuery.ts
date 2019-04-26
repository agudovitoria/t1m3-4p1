import Time from '../../domain/Time';

export default interface TimeQuery {
    execute(user :string, date :Date) :Promise<Time[]>;
}
