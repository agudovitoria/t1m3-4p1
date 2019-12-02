import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export default class TimeRequest {
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @IsUUID()
    product: string;

    @IsNotEmpty()
    @IsUUID()
    concept: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1)
    @Max(99)
    timing: number;

    @IsNotEmpty()
    @IsBoolean()
    validated: boolean;
}
