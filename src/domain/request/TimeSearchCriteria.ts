import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export default class TimeSearchCriteria {
    @IsNotEmpty()
    @IsUUID()
    readonly user: string;

    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;
}
