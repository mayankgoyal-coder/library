import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssueService } from './issue.service';
import { Issue } from './model/issue.interface';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  create(@Body() issue:Issue) {
    return this.issueService.create(issue);
  }

  
}
