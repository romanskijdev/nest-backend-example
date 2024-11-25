import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: 'Баловался', description: 'Причина блокировки'})
    readonly reason: string;

    @ApiProperty({example: '1', description: 'ID пользователя'})
    readonly id: number;
}