export class Product {
  constructor(product: Partial<IProduct>) {
    Object.assign(this, product);
  }
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: number;
  createdAt: Date;
  updatedAt: Date;
}
