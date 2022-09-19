import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';

@Injectable()
export class BookService {


  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

 
}
