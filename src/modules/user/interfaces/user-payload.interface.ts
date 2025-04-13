import { UserType } from '../entities/user.entity';

export interface UserPayload {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  // user_type: UserType;
}
