import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class AllUsersArgs{
    @Field(()=> Int,{nullable:true})
    take:number;

    @Field(()=> Int,{nullable:true})
    offset:number;
   
}