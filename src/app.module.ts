import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigAModule } from './config/config.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from './auth/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RolesGuard } from './base/role/role.guard';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

const golbal = [ConfigAModule];
const appModules = [UserModule, JwtAuthModule, AuthModule];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'tinh2001',
      database: 'hello',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...appModules,
    ...golbal,
    BookModule,
    OrderModule,
    CartModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
