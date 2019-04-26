import Time from '../../domain/Time';

export default interface TimeUseCase {
    execute(time: Time): Promise<Time>;
}
