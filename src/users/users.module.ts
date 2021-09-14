import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { UsersController } from './controller/users.controller';
import { User } from './model/user.entity';
import { UsersService } from './providers/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
