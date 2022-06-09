import {User} from "./User.interface";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
