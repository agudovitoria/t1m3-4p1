import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export default class TimeSearchCriteria {
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date;
}
