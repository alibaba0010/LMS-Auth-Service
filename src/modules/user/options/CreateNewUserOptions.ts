import UserInterface from '../interfaces/UserInterface';

type CreateNewUserOptions = Pick<
  UserInterface,
  'fullName' | 'email' | 'phoneNumber' | 'password'
>;
export default CreateNewUserOptions;
