import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

import mikOrmConfig from '../mikro-orm.config';

import { AuthModule } from './_features/auth/auth.module';
import { UsersModule } from './_features/users/users.module';
import { ProductsModule } from './_features/products/products.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  async onModuleInit() {
    const orm = await MikroORM.init(mikOrmConfig);

    const migrator = orm.getMigrator();
    await migrator.up();
    await orm.close(true);
  }
}
