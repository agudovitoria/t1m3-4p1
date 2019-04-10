import Exception from './Exception';

const CODE :number = 422;
const MESSAGE :string = 'Not processable entity';

export default class UnprocessableRequestException extends Exception {
    status: number;
    message: string;

    constructor(field: string) {
        super(CODE, MESSAGE);
        this.status = CODE;
        this.message = !!field && `Field ${field} is mandatory` || MESSAGE;
    }
}
