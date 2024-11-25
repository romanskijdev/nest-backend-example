import {BelongsToMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationParams {
    name: string;
    description: string;
}

@Table({
    tableName: "roles",
})
export class Role extends Model<Role, RoleCreationParams>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'admin', description: 'Название роли'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({example: 'Admin', description: 'Описание роли'})
    @Column({type: DataType.STRING, unique: true})
    description: string;

    @ApiProperty({example: 'false', description: 'Статус активности роли'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActive: boolean;

    @ApiProperty({example: '2024-11-25T16:22:26.833Z', description: 'Дата и время создания записи'})
    @CreatedAt
    createdAt: Date;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}