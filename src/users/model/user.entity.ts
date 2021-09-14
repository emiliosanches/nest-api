import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;
}