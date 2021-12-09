import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import { Repository } from 'typeorm';
import { USER_SEARCH_FIELD } from './constant/user.constant';
import { AllUsersArgs } from './dto/allUsersArgs.args';
import { createUserInput } from './dto/createUser.input';
import { UpdateUserInput} from './dto/updateUser.input';
import { sortBy } from './helpers/sort';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    async findAllUsers(args:AllUsersArgs){
        const q = this.userRepository
        .createQueryBuilder('users');

        if(args.take) q.take(args.take);
        if(args.offset) q.offset(args.offset);
        //sorting
        if(args.sort) sortBy(q,args.sort,USER_SEARCH_FIELD)
        const [data,total] = await q.getManyAndCount();
        return {data,total};
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

    async findByUsername(userName:string):Promise<any>{
        return await this.userRepository.findOne({where:{username:userName}});
    }
}
