import { BookEntity } from 'src/book/entities/book.entity';
import { IssueEntity } from 'src/issue/model/issue.entity';
import { Entity,PrimaryGeneratedColumn,Column, BeforeInsert, OneToMany} from 'typeorm'
import { Role } from './user.interface';
  



@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    username: string

    @Column({unique: true})
    email: string;

    @Column()
    password:string

    @Column({
        type:"enum",
        enum: Role,
        default: Role.GUEST
    })
    role: Role

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @OneToMany(type => BookEntity, book => book.author)
    book: BookEntity[];

    @OneToMany(type => IssueEntity, issue => issue.user)
    issue: IssueEntity[];
    
}
