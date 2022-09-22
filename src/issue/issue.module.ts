import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from './model/issue.entity';
import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';


@Module({
  imports:[TypeOrmModule.forFeature([IssueEntity,BookEntity,UserEntity]),
AuthModule,
UserModule
],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
