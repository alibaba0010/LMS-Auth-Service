import UserInterface from '../interfaces/UserInterface';

class ErrorCreateUserResponse {
  status_code: number;
  message: string;
}

class SuccessCreateUserResponse {
  status_code: number;
  message: string;
  data: {
    user: {
      fullName: string;
      email: string;
      phoneNumber: string;
      created_at: Date;
    };
  };
}
class RequestVerificationToken {
  email: string;
}

export {
  ErrorCreateUserResponse,
  SuccessCreateUserResponse,
  RequestVerificationToken,
};

type UserResponseDTO = Partial<UserInterface>;
export default UserResponseDTO;
