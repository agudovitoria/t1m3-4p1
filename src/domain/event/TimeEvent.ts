import { v4 } from 'uuid/interfaces';

export default interface TimeEvent {
  id: v4;
  payload: any;
}
