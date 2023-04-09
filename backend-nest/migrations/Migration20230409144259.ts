import { Migration } from '@mikro-orm/migrations';

export class Migration20230409144259 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "email" varchar(50) not null, "password" varchar(100) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');
  }

}
