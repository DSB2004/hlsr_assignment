export interface User {
  email: string;
  authId: string;
  id: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateAccountDTO {
  name: string;
  path: string;
  phone: string;
}

export interface UpdateAccountDTO {
  name: string;
  path: string;
  phone: string;
}
