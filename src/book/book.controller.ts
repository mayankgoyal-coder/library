import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  
}