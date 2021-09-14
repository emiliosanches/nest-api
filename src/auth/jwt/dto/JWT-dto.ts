import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/model/user.entity";

export class JWTResponseDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: User;
}