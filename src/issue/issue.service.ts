import { Injectable } from '@nestjs/common';
import { Issue } from './model/issue.interface';

@Injectable()
export class IssueService {
  create(issue:Issue) {
    return 'This action adds a new issue';
  }

  
}
