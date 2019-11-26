import { IsDate, IsDateString, IsNotEmpty, IsUUID, MaxDate } from 'class-validator';

export default class TimeSearchCriteria {
    @IsNotEmpty()
    @IsUUID()
    readonly user: string;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;

    constructor(user: string, date: Date) {
        this.user = user;
        this.date = date;
    }
}
