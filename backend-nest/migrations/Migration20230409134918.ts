import { Migration } from '@mikro-orm/migrations';

export class Migration20230409134918 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "products" ("id" serial primary key, "name" varchar(255) not null, "price" numeric(10,0) not null, "description" varchar(255) null, "sku" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');
  }

}
