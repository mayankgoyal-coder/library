import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { BookService } from 'src/book/book.service';
import { BookEntity } from 'src/book/entities/book.entity';
import { Book } from 'src/book/entities/book.interface';
import { Any, Repository } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { Role, User } from './model/user.interface';



@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService:AuthService,

    @InjectRepository(BookEntity)
    private readonly bookRepository:Repository<BookEntity>,
    @Inject(forwardRef(() => BookService))
    private bookService: BookService,
  ) { }

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
        switchMap((passwordHash: string) => {
            const newUser = new UserEntity();
  
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.role = user.role;

            return from(this.userRepository.save(newUser)).pipe(
                map((user: User) => {
                    const {password, ...result} = user;
                    return result;
                }),
                catchError(err => throwError(err))
            )
        })
    )
}

findOne(id: string): Observable<User> {
  return from(this.userRepository.findOne({where:{id}})).pipe(
      map((user: User) => {
        // console.log(user);
        
          const {password, ...result} = user;
          return result;
      } )
  )
}

findAll(): Observable<User[]> {
  return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
          users.forEach(function (v) {delete v.password});
          return users;
      })
  );
}



deleteOne(id: string): Observable<any> {
  return from(this.userRepository.delete(id));
}


updateOne(id: string, user: User): Observable<any> {
  delete user.email;
  delete user.password;
  delete user.role;

  return from(this.userRepository.update(id, user))
}

updateRoleOfUser(id: string, user: User): Observable<any> {
  return from(this.userRepository.update(id, user));
}


login(user: User): Observable<string> {
  return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        console.log(user);
        
          if(user) {
              return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
          } else {
              return 'Wrong Credentials';
          }
      })
  )
}

validateUser(email: string, password: string): Observable<User> {
  return from(this.userRepository.findOne({where:{email}})).pipe(
      switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
              if(match) {
                  const {password, ...result} = user;
                  // console.log(result);
                  
                  return result;
              } else {
                  throw Error;
              }
          })
      ))
  )

}

findByMail(email: string): Observable<User> {
  return from(this.userRepository.findOne({where:{email}}));
}


}


