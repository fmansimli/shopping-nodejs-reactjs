import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ type: 'numeric' })
  price: number;

  @Property({ nullable: true })
  description: string;

  @Property()
  sku: number;

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date = null;
}
