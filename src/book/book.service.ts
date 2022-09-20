import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
const slugify = require('slugify');
import { BookEntity } from './entities/book.entity';
import { Book } from './entities/book.interface';

@Injectable()
export class BookService {


  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private userService: UserService
  ) {}

  create(user: User, book: Book): Observable<Book> {
    book.author = user;
    console.log(book);
    return this.generateSlug(book.name).pipe(
        switchMap((slug: string) => {
            book.slug= slug;
            return from(this.bookRepository.save(book));
        })
    )
}

generateSlug(name: string): Observable<string> {
  return of(slugify(name));
}



}
