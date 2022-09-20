import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BookService } from './book.service';
import { Book } from './entities/book.interface';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
 create(@Body() book:Book, @Request() req):Observable<Book>{
  const user = req.user.user;
  return this.bookService.create(user,book)
 }


//  @Get(':id')
//     findOne(@Param('id') id: number): Observable<Book> {
//         return this.bookService.findOne({where:{id}});
//     }

//     @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
//     @Put(':id')
//     updateOne(@Param('id') id: number, @Body() blogEntry: BlogEntry): Observable<BlogEntry> {
//         return this.bookService.updateOne(Number(id), blogEntry);
//     }

//     @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
//     @Delete(':id')
//     deleteOne(@Param('id') id: number): Observable<any> {
//         return this.bookService.deleteOne(id);
  
}