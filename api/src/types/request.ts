export interface RegisterRequestArgs {
  name: string;
  email: string;
  profile: string;
  password: string;
}

export interface LoginRequestArgs {
  email: string;
  password: string;
}

// * all fields starts with `new` will have default data of user if he didn't update any of fields
export interface UpdateRequestArgs {
  userId: number;
  userOldEmail: string;
  newName: string;
  newEmail: string;
  newProfile: string;
  newPassword: string;
}
