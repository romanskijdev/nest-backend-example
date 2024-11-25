import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleModule: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        return await this.roleModule.create(dto);
    }

    async getRoleByName(name: string) {
        return await this.roleModule.findOne({ where: {name} });
    }
}
