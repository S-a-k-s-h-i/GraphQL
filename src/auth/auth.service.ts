import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserInput } from 'src/user/createUser.input';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService: JwtService
        ){}

    async validateUser(username:string,pass:string):Promise<any>{
        const user = await this.userService.findByUsername(username);
        const valid = await bcrypt.compare(pass,user.password);
        if(user && valid){
           const {password,...result} = user;
           return result;
        }
        return null;
    }

    async login(user:User){
        const payload = { username:user.username,sub:user.id}
        return {
            access_token:this.jwtService.sign(payload),
            user
        }
    }

    async signUp(createUserInput:createUserInput){
        const user = await this.userService.findByUsername(createUserInput.username);
        if(user)
         throw new Error('User Already exist');

        return this.userService.createNewUser(createUserInput);
    }
}
