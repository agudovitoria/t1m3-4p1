import { ProductEntity } from '../persistence/ProductEntity';
import { v4String } from 'uuid/interfaces';

export default class Product {
  id: v4String;
  name: string;

  constructor() {
    this.id = null;
    this.name = null;
  }

  fromEntity(productEntity: ProductEntity): Product {
    this.id = productEntity.id;
    this.name = productEntity.name;

    return this;
  }

  fromJson(request: any): Product {
    const { name }: Product = request;
    this.name = name || null;

    return this;
  }

  toJson(): object {
    return { name: this.name };
  }
}
