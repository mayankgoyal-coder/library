import { BookEntity } from "src/book/entities/book.entity";
import { UserEntity } from "src/user/model/user.entity";
import {  Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IssueEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

   @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
   issueAt: Date;

   @Column({nullable:true})
   returnAt: Date;   
   
   @Column()
   userId:string

   @Column()
   bookId:string

   @Column({default:0})
   fine:number

   @ManyToOne(type => BookEntity, books=> books.issue)
   books: BookEntity;


   @ManyToOne(type => UserEntity, user=> user.issue)
   user: UserEntity;


 }