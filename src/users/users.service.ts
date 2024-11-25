import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDTO} from "./dto/add-role.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userModule: typeof User, private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModule.create(dto);
        const role = await this.roleService.getRoleByName("user");

        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user
    }

    async getAllUsers() {
        return await this.userModule.findAll({
            include: {
                all: true
            }
        })
    }

    async getUserByEmail(email: string) {
        return await this.userModule.findOne({ where: { email }, include: { all: true } });
    }

    async addRole(dto: AddRoleDTO) {
        const user = await this.userModule.findByPk(dto.id);
        const role = await this.roleService.getRoleByName(dto.role);
        
        if (role && user) {
             await user.$add('roles', role);
             return dto
        }
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
}
