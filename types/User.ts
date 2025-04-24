// Todo : need to find a way to properly ask users to key in their address
export interface UserRegisterDTO {
  name: string;
  email: string;
  clerkId: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  clerkId: string;
  createdAt: string;
}
