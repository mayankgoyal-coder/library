import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/book/entities/book.entity';
import { Book } from 'src/book/entities/book.interface';
import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { IssueDto } from './dto/create-issue.dto';
import { ReturnDto } from './dto/create-return.dto';

import { IssueEntity } from './model/issue.entity';
import { ReturnEntity } from './model/return.entity';

@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository:Repository<IssueEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private authService:AuthService,
 @InjectRepository(ReturnEntity)
 private readonly returnRepository:Repository<ReturnEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository:Repository<BookEntity>,
  ){}



async issueBook (issueDto:IssueDto, user:UserEntity,book:BookEntity){
 
// const guestId = await this.userRepository.findOne({where:{id:user.id}})
// console.log(guestId);

// if(guestId == null){
//   throw new NotFoundException();
// }


// const findBook = await this.bookRepository.findOne({where:{id:book.id}})
// console.log(findBook);

// if(findBook === null){
//   throw new NotFoundException();
//   }

  const { userId,bookId} = issueDto
  let createIssue =  await this.issueRepository.create({
   
    userId,
     bookId,
    //  returnAt

  })
  await this.issueRepository.save(createIssue)

  const updateBookCount = await this.bookRepository.createQueryBuilder()
  .update(BookEntity)
  .set({
      
      quantity: () => "quantity - 1",
  })
  .where("id = :id", { id: bookId })
  .execute()
  return createIssue;

}

//************************************************************** */

async returnBook(returnDto:ReturnDto,issue:IssueEntity){
  const issueId = await this.issueRepository.findOne({where:{id:issue.id}})
console.log(issueId);

if(issueId == null){
  throw new NotFoundException();
}


const matchUser = await this.userRepository.findOne({where:{id:issueId.userId}})
console.log(matchUser);

if(matchUser === null){
  throw new NotFoundException();
  }

  
const matchBook = await this.bookRepository.findOne({where:{id:issueId.bookId}})
console.log(matchBook);

if(matchBook === null){
  throw new NotFoundException();
  }


  // const updateBookCount = await this.bookRepository.createQueryBuilder()
  //   .update(BookEntity)
  //   .set({
        
  //       quantity: () => "quantity + 1",
  //   })
  //   .where("id = :id", { id: bookId })
  //   .execute()


  }
}

