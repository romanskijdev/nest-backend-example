import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private JWT: JwtService) {}

    async login(userDto: CreateUserDto) {
        const findUser = await this.validateUser(userDto);
        return this.generateToken(findUser);
    }

    async register(userDto: CreateUserDto) {
        const findUser = await this.userService.getUserByEmail(userDto.email);
        if (findUser) {
            throw new HttpException("user_already_exist", HttpStatus.BAD_REQUEST);
        }

        const hashPass = await bcrypt.hash(userDto.password, 12);

        const user = await this.userService.createUser({ ...userDto, password: hashPass })

        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = {
            email: user.email,
            roles: user.roles,
        }

        return {
            token: this.JWT.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const findUser = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, findUser.password);

        if (findUser && passwordEquals) {
            return findUser
        }

        throw new UnauthorizedException({
            message: 'invalid_login_or_password'
        })
    }
}
