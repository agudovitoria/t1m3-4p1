export default class Exception extends Error{
    code: number;

    constructor(code: number, message: string) {
        super(message || 'Generic server error');

        this.code = code || 500;
    }
}
