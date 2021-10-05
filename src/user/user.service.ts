import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserInput } from './createUser.input';
import { UpdateUserInput} from './updateUser.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    async findAllUsers():Promise<User[]>{
        return this.userRepository.find();
    }

    async createNewUser(createUserInput:createUserInput):Promise<User>{
        const newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }

    async findById(id:number):Promise<User>{
        return this.userRepository.findOneOrFail(id);
    }

    async updateUserById(id:number,updateUserInput:UpdateUserInput):Promise<User>{
        const user = await this.findById(id);
        Object.assign(user,updateUserInput)
        return this.userRepository.save(user);
    }
}
