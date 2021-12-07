import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

