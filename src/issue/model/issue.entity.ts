import { BeforeUpdate, Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IssueEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

      @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
   createdAt: Date;

   @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
   updatedAt: Date;    

   @BeforeUpdate()
   updateTimestamp() {
       this.updatedAt = new Date;
   }


}