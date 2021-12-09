import { Field, InputType } from "@nestjs/graphql";
import { IsIn } from "class-validator";

@InputType()
export class SortInput{
   @Field()
   readonly sortBy:string;
   @Field()
   @IsIn(['asc','desc','ASC','DESC'])
   readonly sort:string;
}