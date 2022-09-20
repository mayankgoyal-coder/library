import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/model/user.interface';
import { BookService } from './book.service';
import { Book } from './entities/book.interface';
// import { UserIsAuthorGuard } from './guards/user-is-author.guard';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() book: Book, @Request() req): Observable<Book> {
    const user = req.user;
    return this.bookService.create(user, book)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findBlogEntries(@Query('userId') userId: any): Observable<Book[]> {
    if (userId == null) {
      return this.bookService.findAll();
    } else {
      return this.bookService.findByUser(userId);
    }
  }


  //  @Get(':id')
  //      findOne(@Param('id') id: string): Observable<Book> {
  //          return this.bookService.findOne({where:{id}});
  //      }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() book: Book): Observable<Book> {
    return this.bookService.updateOne((id), book);
  }

  // @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.bookService.deleteOne(id);

  }
}