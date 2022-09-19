import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'



@Entity()
export class Book {

   @PrimaryGeneratedColumn('uuid')
   bookId: string

   @Column()
   name: string

   @Column({ unique: true })
   ISBN: string

   @Column()
   category: string

   @Column()
   price: string

   @Column()
   quantity: number

   @CreateDateColumn()
   issued_At: Date;
 
   @CreateDateColumn()
   returned_At: Date;
   


}