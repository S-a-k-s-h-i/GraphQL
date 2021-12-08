import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput{

    @Field()
    username:string;
    
    @Field({nullable:true})
    age?:number;
}