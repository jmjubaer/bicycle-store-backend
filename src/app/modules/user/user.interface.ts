export interface TUser {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin' | "supperAdmin" | 'customer';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
