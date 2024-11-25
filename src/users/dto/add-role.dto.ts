import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDTO {
    @ApiProperty({example: 'admin', description: 'Название роли'})
    readonly role: string;

    @ApiProperty({example: '1', description: 'ID пользователя'})
    readonly id: number;
}