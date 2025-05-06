import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from '../../../common/db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockRepo: jest.Mocked<Repository<User>>;

  const createUserDto: CreateUserDto = {
    userId: 'testuser',
    email: 'test@example.com',
    password: '1234',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    mockRepo = module.get(getRepositoryToken(User));
  });

  it('should create a new user', async () => {
    const newUser = { ...createUserDto, id: 1 } as User;
    mockRepo.create.mockReturnValue(newUser);
    mockRepo.save.mockResolvedValue(newUser);

    const result = await userRepository.create(createUserDto);
    expect(result).toEqual(newUser);
    expect(mockRepo.create).toHaveBeenCalledWith(createUserDto);
    expect(mockRepo.save).toHaveBeenCalledWith(newUser);
  });

  it('should find all users', async () => {
    const users = [{ id: 1 }, { id: 2 }] as User[];
    mockRepo.find.mockResolvedValue(users);
    const result = await userRepository.findAll();
    expect(result).toEqual(users);
  });

  it('should find one user', async () => {
    const user = { id: 1, userId: 'testuser' } as User;
    mockRepo.findOne.mockResolvedValue(user);
    const result = await userRepository.findOne({ userId: 'testuser' });
    expect(result).toEqual(user);
  });

  it('should count all users', async () => {
    mockRepo.count.mockResolvedValue(5);
    const result = await userRepository.countAll();
    expect(result).toBe(5);
  });

  it('should check if user exists by userId', async () => {
    mockRepo.count.mockResolvedValue(1);
    const exists = await userRepository.existsByUserId('testuser');
    expect(exists).toBe(true);
  });

  it('should update a user', async () => {
    const existingUser = { id: 1, userId: 'testuser' } as User;
    const updatedUser = { ...existingUser, email: 'updated@example.com' };
    mockRepo.findOne.mockResolvedValue(existingUser);
    mockRepo.merge.mockReturnValue(updatedUser);
    mockRepo.save.mockResolvedValue(updatedUser);

    const result = await userRepository.update('testuser', {
      email: 'updated@example.com',
    });

    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    await userRepository.delete('testuser');
    expect(mockRepo.delete).toHaveBeenCalledWith({ userId: 'testuser' });
  });
});
