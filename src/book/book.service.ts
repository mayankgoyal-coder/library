import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';
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
    // console.log(book);
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
// const newBook = new BookEntity();
// return from(this.bookRepository.save(newBook)).pipe(
//   map((book:Book)=> {
//     const {...result} = book;
//     return result
//   }),
//   catchError(err => throwError(err))
// )
//  }
 

findAll() :Observable<Book[]> {
  return from(this.bookRepository.find({relations:['author']}));
}

findByUser(userId:any):Observable<Book[]>{
  console.log(userId);
  
  return from(this.bookRepository.find({
    where:{
      author : userId
    },
    relations:['author']
  })).pipe(
    map((book:Book[])=> book)
  )
}


// findOne(id: string): Observable<Book> {
//   return from(this.bookRepository.findOne({where:{id}}, {relations: ['author']}));
// }

updateOne(id: string, book: Book): Observable<Book> {
  return from(this.bookRepository.update(id, book)).pipe(
      switchMap(() => this.bookRepository.findOne({where:{id}}))
  )
}

deleteOne(id: string): Observable<any> {
  return from(this.bookRepository.delete(id));
}



}
