import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'example@example.com', description: 'Email пользователя'})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    readonly password: string;
}