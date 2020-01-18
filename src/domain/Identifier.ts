import { v4 } from 'uuid/interfaces';

export default class Identifier {
  public id: v4;

  constructor(id: v4) {
    this.id = id;
  }
}
