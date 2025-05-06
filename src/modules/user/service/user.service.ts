import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { exceptions } from 'src/common/exceptions/exception.config';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByUserId(userId: string) {
    return await this.userRepository.findOne({ userId: userId });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email: email });
  }

  async verifyUser(userId: string, password: string) {
    const users = await this.userRepository.findAll();

    return await users.find(
      (user) => user.userId === userId && user.password === password
    );
  }

  async registerUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async count() {
    return await this.userRepository.countAll();
  }

  async exists(userId: string) {
    return await this.userRepository.existsByUserId(userId);
  }

  async update(id: string, createUserDto: CreateUserDto) {
    if (!(await this.exists(id))) {
      throw exceptions.USER_NOT_FOUND;
    }

    return await this.userRepository.update(id, createUserDto);
  }

  async delete(id: string) {
    if (!(await this.exists(id))) {
      throw exceptions.USER_NOT_FOUND;
    }

    return await this.userRepository.delete(id);
  }
}
