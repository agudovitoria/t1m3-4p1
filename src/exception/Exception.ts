export default class Exception extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message || 'Generic server error');

        this.status = status || 500;
    }
}
