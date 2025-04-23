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
