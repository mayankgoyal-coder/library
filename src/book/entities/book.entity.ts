import { IssueEntity } from 'src/issue/model/issue.entity'
import { UserEntity } from 'src/user/model/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BeforeUpdate, JoinColumn, OneToOne } from 'typeorm'



@Entity()
export class BookEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column()
   name: string

   @Column({ unique: true })
   ISBN: string

   @Column()
   category: string

   @Column()
   slug: string

   @Column()
   price: number

   @Column()
   quantity: number

//    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
//    createdAt: Date;

//    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
//    updatedAt: Date;    

//    @BeforeUpdate()
//    updateTimestamp() {
//        this.updatedAt = new Date;
//    }

   
   @ManyToOne(type => UserEntity, user => user.book)
    author: UserEntity;

   //  @OneToOne(() => IssueEntity)
   //  @JoinColumn()
   //  issue: IssueEntity

}