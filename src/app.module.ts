import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConnectionFactory } from './database/database.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true
    }),
    DatabaseConnectionFactory(),
    UsersModule,
    AuthModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
