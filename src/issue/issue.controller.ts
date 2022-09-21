import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';
import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import { IssueDto } from './create-issue.dto';
import { ReturnDto } from './create-return.dto';
import { IssueService } from './issue.service';
import { IssueEntity } from './model/issue.entity';


@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  

  @Post()
  issueBook( @Body()issueDto:IssueDto,user:UserEntity,book:BookEntity) {
    return this.issueService.issueBook(issueDto,user,book);
  }
  @Post('return')
  returnBook( @Body()returnDto:ReturnDto,issue:IssueEntity,) {
    return this.issueService.returnBook(returnDto,issue);
  }
  
}
