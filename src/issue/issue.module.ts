import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from './model/issue.entity';
import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { ReturnEntity } from './model/return.entity';

@Module({
  imports:[TypeOrmModule.forFeature([IssueEntity,BookEntity,UserEntity,ReturnEntity])],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
