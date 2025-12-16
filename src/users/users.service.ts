import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from "bcrypt"
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private usersRepository: Repository<UserEntity>) { }

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email)
    if (userExists) throw new BadRequestException("Email is not available")
    userSignUpDto.password = await hash(userSignUpDto.password, 10)
    console.log('Hashed password:', userSignUpDto.password)
    let user = this.usersRepository.create(userSignUpDto);
    return await this.usersRepository.save(user);
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository.createQueryBuilder("users").addSelect("users.password")
    .where("users.email=:email",{email:userSignInDto.email}).getOne();
    if(!userExists) throw new BadRequestException("Bad credentials.")
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if(!matchPassword) throw new BadRequestException("Bad credentials.")

    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }
  accessToken(user: UserEntity): string {
    return sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET_KEY as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DATE as string } as any);
  }

}
