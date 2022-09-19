import { Entity,PrimaryGeneratedColumn,Column, BeforeInsert} from 'typeorm'
import { Role } from './user.interface';
  



@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    username: string

    @Column({unique: true})
    email: string;

    @Column({select:false})
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

    
}
