import TimeEvent from './TimeEvent';
import { v4 } from 'uuid/interfaces';

export default class AddTimeEvent implements TimeEvent {
  public readonly id: v4;
  public readonly payload: any;

  constructor(id: v4, payload: any) {
    this.id = id;
    this.payload = payload;
  }
}
