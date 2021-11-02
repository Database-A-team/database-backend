import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user-input';
import { User } from './user/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(createUserInput);
        return await this.userRepository.save(user);
    }

    async findOne(user_id: string): Promise<User> {
        const user = await this.userRepository.findOne(user_id);
        if(!user) {
            throw new NotFoundException(`User ${user_id} not found`);
        }
        return user;
    }

    async findAll(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    async update(user_id: string, updateUserInput: UpdateUserInput): Promise<User> {
        const user = await this.userRepository.preload({
            user_id: user_id,
            ...updateUserInput,
        });

        if(!user) {
            throw new NotFoundException(`User ${user_id} not found`);
        }

        return await this.userRepository.save(user);
    }

    async remove(user_id: string): Promise<User> {
        const user = await this.findOne(user_id);
        await this.userRepository.remove(user);
        return {
            user_id: user_id,
            name: '',
            age: 0,
            email: '',
            phone_number: '',
        }
    }
}
