import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { BookModule } from 'src/book/book.module';
import { BookEntity } from 'src/book/entities/book.entity';

@Module({
  imports:[
    (TypeOrmModule.forFeature([UserEntity,BookEntity])),
    
   AuthModule,
   BookModule
  
  
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
