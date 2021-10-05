import { Resolver,Query, Mutation, Args, Int } from '@nestjs/graphql';
import { createUserInput } from './createUser.input';
import { UpdateUserInput} from './updateUser.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService:UserService){}
    
    @Query(returns => [User])
    AllUsers(): Promise<User[]>{
        return this.userService.findAllUsers()
    }
    
    @Mutation(returns => User)
    createUser(@Args('createUserInput')createUserInput:createUserInput):Promise<User>{
        return this.userService.createNewUser(createUserInput);
    }
    
    @Mutation(returns => User)
    findUserById(@Args('id',{type:() => Int}) id:number):Promise<User>{
           return this.userService.findById(id);
    }
    
    @Mutation(returns => User)
    async updateUserById(@Args('id') id: number,@Args('updateUserInput') updateUserInput:UpdateUserInput) {
      return this.userService.updateUserById(id,updateUserInput);
    }
}
