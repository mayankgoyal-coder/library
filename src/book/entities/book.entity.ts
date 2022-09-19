import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'



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
   


}