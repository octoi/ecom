export interface UserType {
  id?: string;
  name: string;
  email: string;
  profile: string;
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  place: string;
  price: number;
  images: string[];
  createdAt?: string;
  owner?: UserType;
}
