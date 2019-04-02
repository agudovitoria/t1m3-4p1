import Exception from './Exception';

const CODE = 404;
const MESSAGE = 'Not found exception';

export default class NotFoundException extends Exception {
    code: number;
    message: string;

    constructor(message: string) {
        super(CODE, MESSAGE);
        this.code = CODE;
        this.message = message || MESSAGE;
    }
}
