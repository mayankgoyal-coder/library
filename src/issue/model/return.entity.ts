import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReturnEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

 

   @Column()
   returnAt: Date;
   
   @Column()
   issueId:string;

   @Column()
   penalty:number;
  
}