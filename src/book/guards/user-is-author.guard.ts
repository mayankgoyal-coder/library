// import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";

// import { Observable } from "rxjs";

// import { switchMap, map } from "rxjs/operators";
// import { User } from "src/user/model/user.interface";
// import { UserService } from "src/user/user.service";
// import { BookService } from "../book.service";
// import { Book } from "../entities/book.interface";


// @Injectable()
// export class  UserIsAuthorGuard implements CanActivate {

//     constructor(private userService: UserService,
//          private bookService: BookService) {}

//     canActivate(context: ExecutionContext): Observable<any> {
//         const request = context.switchToHttp().getRequest();

//         const params = request.params;
//         const bookId = params.id;
//         const user: User = request.user;

//         return this.userService.findOne(user.id).pipe(
//             switchMap((user: User) => this.bookService.findOne({where:{bookId}}).pipe(
//                 map((book: Book) => {
//                     let hasPermission = false;

//                     if(user.id === book.author.id) {
//                         hasPermission = true;
//                     }

//                     return user && hasPermission;
//                 })
//             ))
//         )       
//     }
// }