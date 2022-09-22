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


@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: Repository<IssueEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private authService:AuthService,
    

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}



  async issueBook(issueDto: IssueDto, user: UserEntity, book: BookEntity) {
  // console.log(user,book);
  // console.log(issueDto.returnAt);
  // let returnDate = new Date('2022-05-22')
  // console.log(returnDate)

    const guestId = await this.userRepository.findOne({where:{id:issueDto.userId}})
    // console.log(guestId);


    if(guestId.role== 'admin'){
      throw new NotFoundException()
    }
    if(guestId.role== 'issuer'){
      throw new NotFoundException()
    }

    if(guestId === null){
      console.log("hello");
      
     throw new NotFoundException();
    }


    const findBook = await this.bookRepository.findOne({where:{id:issueDto.bookId}})
    // console.log(findBook);

    if(findBook === null){
      throw new NotFoundException();
      }

      if(findBook.quantity == 0){
        return {message: "this book is not in stock"}
      }

    let { userId, bookId,returnAt } = issueDto
    returnAt = new Date(returnAt)
    let createIssue = await this.issueRepository.create({

      userId,
      bookId,
      returnAt

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

  async returnBook(issueDto: IssueDto, issue: IssueEntity) {
    const issueId = await this.issueRepository.findOne({ where: { id: issueDto.id} })
    console.log(issueId.returnAt,issueId);
    
    // let issueDate=issueId.issueAt.toDateString()
    let currentDate1=new Date()
    let returnDate=issueId.returnAt     ///.toDateString()
    let time_difference = currentDate1.getTime() - returnDate.getTime();  
  
    //calculate days difference by dividing total milliseconds in a day  
    let days_difference = (Math.floor(time_difference / (1000 * 60 * 60 * 24))*1)
// let days_diff=parseInt(days_difference)
console.log(days_difference)

const updateBookCount = await this.bookRepository.createQueryBuilder()
      .update(BookEntity)
      .set({

          quantity: () => "quantity + 1",
      })
      .where("id = :id", { id: issueId.bookId })
      .execute()



if(days_difference>0){
// days_difference=days_difference-days_difference%1

let fine=days_difference*2
const updateFine = await this.issueRepository.createQueryBuilder()
.update(IssueEntity).set({
  fine:fine
})
return { message: `fine ${fine}`}
}else{
let fine=0

return {message: `book return successfully`}
}



    

// // if (issueId == null) {
//     //   throw new NotFoundException();
//     // }


//     // const matchUser = await this.userRepository.findOne({ where: { id: issueId.userId } })
//     // // console.log(matchUser);

//     // if (matchUser === null) {
//     //   throw new NotFoundException();
//     // }


//     // const matchBook = await this.bookRepository.findOne({ where: { id: issueId.bookId } })
//     // // console.log(matchBook);

//     // if (matchBook === null) {
//     //   throw new NotFoundException();
//     // }


  


 }
}

