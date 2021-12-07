import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;
    
    @Column()
    @Field()
    username:string;
    
    @Column({nullable:true})
    @Field(type => Int,{nullable:true})
    age?:number;
    
    @Column()
    @Field()
    password:string;

    @BeforeInsert()
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 10);
    }
}

