export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | "supperAdmin" | 'customer';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
