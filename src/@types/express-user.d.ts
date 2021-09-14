import { User as UserEntity } from "src/users/model/user.entity";

declare module 'express' {
  interface Request {
    user?: UserEntity | undefined;
  }
}
