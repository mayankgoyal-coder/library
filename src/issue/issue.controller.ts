import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { query } from 'express';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { Role, User } from 'src/user/model/user.interface';
import { IssueDto } from './dto/create-issue.dto';
import { ReturnDto } from './dto/create-return.dto';
import { IssueService } from './issue.service';
import { IssueEntity } from './model/issue.entity';


@Controller('book')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  
  // @hasRoles(Role.ISSUER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('issue')
  issueBook( @Body()issueDto:IssueDto,user:UserEntity,book:BookEntity) {
    return this.issueService.issueBook(issueDto,user,book);
  }


  @Post('return')
  returnBook( @Body()issueDto:IssueDto,issue:IssueEntity,) {
    return this.issueService.returnBook(issueDto,issue);
  }
  
}
