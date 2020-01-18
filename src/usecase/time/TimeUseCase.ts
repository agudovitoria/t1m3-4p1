import Time from '../../domain/Time';
import Identifier from '../../domain/Identifier';

export default interface TimeUseCase {
    execute(time: Time): Promise<Identifier>;
}
