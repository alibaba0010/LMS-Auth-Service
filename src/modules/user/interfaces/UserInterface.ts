// import { Profile } from '../../../modules/profile/entities/profile.entity';
import { UserType } from '../entities/user.entity';

interface UserInterface {
  id: string;

  fullName: string;

  email: string;

  phoneNumber: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  phone_number?: string;

  // profile?: Profile;
}

export default UserInterface;
