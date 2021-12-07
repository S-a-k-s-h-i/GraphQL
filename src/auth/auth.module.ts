import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, AuthResolver,LocalStrategy,JwtStrategy],
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:'hide-me',
      signOptions:{expiresIn:'60s'}
    })
  ]
})
export class AuthModule {}
