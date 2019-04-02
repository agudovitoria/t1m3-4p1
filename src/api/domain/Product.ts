import { ProductEntity } from '../persistence/ProductEntity';

export default class Product {
    id: string;
    name: string;

    constructor() {
        this.id = null;
        this.name = null;
    }

    fromEntity(productEntity: ProductEntity) :Product {
        this.id = productEntity._id;
        this.name = productEntity.name;

        return this;
    }

    fromJson(request: any) :Product {
        const { name } :Product = request;
        this.name = name || null;

        return this;
    }

    toJson() :object {
        return { name: this.name };
    }
}
