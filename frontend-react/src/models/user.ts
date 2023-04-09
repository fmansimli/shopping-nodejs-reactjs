export class User {
  constructor(user: Partial<IUser>) {
    Object.assign(this, user);
  }
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
