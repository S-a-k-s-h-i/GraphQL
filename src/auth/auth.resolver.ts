import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { createUserInput } from 'src/user/createUser.input';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService:AuthService){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput:LoginUserInput,@Context() context){
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
    signUp(@Args('createUserInput') createUserInput:createUserInput){
        return this.authService.signUp(createUserInput);
    }
}
