import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { SortInput } from "./sort.input";

@ArgsType()
export class AllUsersArgs{
    @Field(()=> Int,{nullable:true})
    take:number;

    @Field(()=> Int,{nullable:true})
    offset:number;
    
    @Field(()=>[SortInput],{nullable:true})
    @IsOptional()
    @Type(() => SortInput)
    @IsArray()
    @ValidateNested({each:true})
    sort:SortInput[];
   
}