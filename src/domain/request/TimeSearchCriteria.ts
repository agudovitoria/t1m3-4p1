import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export default class TimeSearchCriteria {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  getCriteria(): object {
    return {
      user: this.user,
      date: this.date,
    };
  }
}
