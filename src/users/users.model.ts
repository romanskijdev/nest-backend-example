import {BelongsToMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationParams {
    email: string;
    password: string;
}

@Table({
    tableName: "users",
})
export class User extends Model<User, UserCreationParams>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Eugen', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: 'example@example.com', description: 'Email пользователя'})
    @Column({type: DataType.STRING, unique: true})
    email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING})
    password: string;

    // TODO: Перенести флажки бана и причину в отдельную таблицу
    @ApiProperty({example: 'true', description: 'Статус блокировки пользователя'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    blocked: boolean;

    @ApiProperty({example: 'Exploited', description: 'Причина блокировки пользователя'})
    @Column({type: DataType.STRING, allowNull: true})
    blockReason: string;

    @ApiProperty({example: '2024-11-25T16:22:26.833Z', description: 'Дата и время создания аккаунта'})
    @CreatedAt
    createdAt: Date;

    @ApiProperty({example: '2024-11-25T16:22:26.833Z', description: 'Дата и время обновления аккаунта'})
    @UpdatedAt
    updatedAt: Date;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}