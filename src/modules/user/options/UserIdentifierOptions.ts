type UserIdentifierOptionsType =
  | {
      identifierType: 'id';
      identifier: string;
    }
  | {
      identifierType: 'fullName';
      identifier: string;
    }
  | {
      identifierType: 'email';
      identifier: string;
    }
  | {
      identifierType: 'phoneNumber';
      identifier: string;
    };

export default UserIdentifierOptionsType;
