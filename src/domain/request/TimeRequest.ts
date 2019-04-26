import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export default class TimeRequest {
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

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
