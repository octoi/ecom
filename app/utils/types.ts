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

export interface ChatType {
  id: string;
  messages?: MessageType[];
  senderId?: number;
  receiverId?: number;
  sender?: UserType;
  receiver?: UserType;
}

export interface MessageType {
  id?: string;
  message: string;
  time: string;
  senderId: number;
}
