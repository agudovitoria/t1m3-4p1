import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export default class TimeRequest {
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsUUID()
    product: string;

    @IsNotEmpty()
    @IsUUID()
    concept: string;

    @IsNotEmpty()
    @IsNumber()
    timing: number;

    @IsNotEmpty()
    @IsBoolean()
    validated: boolean;
}
