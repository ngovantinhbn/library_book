import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthService } from './jwt.service';
import { JwtAuthStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigService } from '../config/config.service';
import { JwtAuthGuard } from './jwt.guard';
import { ConfigAModule } from '../config/config.module';

@Module({
  imports: [
    UserModule,
    ConfigAModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.ACCESS_SECRET,
        signOptions: {
          expiresIn: config.ACCESS_TOKEN_EXP,
        },
      }),
    }),
  ],
  providers: [JwtAuthService, JwtAuthStrategy, JwtAuthGuard],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
