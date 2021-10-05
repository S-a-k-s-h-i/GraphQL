import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput{

    @Field()
    name:string;
    
    @Field({nullable:true})
    age?:number;
}