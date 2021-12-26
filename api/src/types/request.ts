// User types
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
export interface UpdateUserRequestArgs {
  newName: string;
  newEmail: string;
  newProfile: string;
  newPassword: string;
}

// Product types
export interface NewProductRequestArgs {
  title: string;
  description: string;
  images: string[];
  price: number;
  place: string;
}
