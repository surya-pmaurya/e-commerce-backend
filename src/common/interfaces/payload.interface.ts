import { UserRole } from "../enum/user-role.enum";

export interface LogInPayload {
  userId: number;
  email: string;
  role: UserRole;
}
