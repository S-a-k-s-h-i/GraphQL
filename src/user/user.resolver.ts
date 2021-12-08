import { Resolver,Query, Mutation, Args, Int, Subscription, Context } from '@nestjs/graphql';
import { createUserInput } from './dto/createUser.input';
import { UpdateUserInput} from './dto/updateUser.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PubSub } from 'graphql-subscriptions'
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AllUsersArgs } from './dto/allUsersArgs.args';
import { AllUsersPaginateEventDto } from './dto/paginate-allusers-event.dto';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private userService:UserService){}
    
    @Query(returns => AllUsersPaginateEventDto)
    async AllUsers(@Args() args:AllUsersArgs){
        const {data,total} = await this.userService.findAllUsers(args);
        return new AllUsersPaginateEventDto(data,total);
    }
    
    // @Mutation(returns => User)
    // createUser(@Args('createUserInput')createUserInput:createUserInput):Promise<User>{
    //     const newUser = this.userService.createNewUser(createUserInput);
    //     pubSub.publish('userAdded',{userAdded:newUser});
    //     return newUser;
    // }
    
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
    
    @Mutation(returns => User)
    @UseGuards(JwtAuthGuard)
    getProfile(@Context() context):Promise<User>{
      return context.req.user
    }
}
