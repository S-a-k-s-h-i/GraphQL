import { Resolver,Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { createUserInput } from './createUser.input';
import { UpdateUserInput} from './updateUser.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private userService:UserService){}
    
    @Query(returns => [User])
    AllUsers(): Promise<User[]>{
        return this.userService.findAllUsers()
    }
    
    @Mutation(returns => User)
    createUser(@Args('createUserInput')createUserInput:createUserInput):Promise<User>{
        const newUser = this.userService.createNewUser(createUserInput);
        pubSub.publish('userAdded',{userAdded:newUser});
        return newUser;
    }
    
    @Mutation(returns => User)
    findUserById(@Args('id',{type:() => Int}) id:number):Promise<User>{
           return this.userService.findById(id);
    }
    
    @Mutation(returns => User)
    async updateUserById(@Args('id') id: number,@Args('updateUserInput') updateUserInput:UpdateUserInput) {
      return this.userService.updateUserById(id,updateUserInput);
    }

    @Subscription(returns => User)
    userAdded(){
      return pubSub.asyncIterator('userAdded');
    }
}
