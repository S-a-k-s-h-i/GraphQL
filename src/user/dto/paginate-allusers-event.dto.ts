import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../user.entity";

@ObjectType()
export class AllUsersPaginateEventDto{
    @Field()
    total:number;
    
    @Field(() => [User])
    data:User[]

    constructor(allUsersEvent:User[],total:number){
        this.total=total;
        this.data=allUsersEvent;
    }
}