import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

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
export class AppModule {}
