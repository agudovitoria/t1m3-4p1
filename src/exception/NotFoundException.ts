import Exception from './Exception';

const CODE :number = 404;
const MESSAGE :string = 'Not found exception';

export default class NotFoundException extends Exception {
    code: number;
    message: string;

    constructor(field: string) {
        super(CODE, MESSAGE);
        this.code = CODE;
        this.message = !!field && `Field ${field} is mandatory` || MESSAGE;
    }
}
