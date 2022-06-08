import {User} from "./User";

export interface AuthResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: User;
}
