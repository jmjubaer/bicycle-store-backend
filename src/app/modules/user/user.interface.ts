export interface TUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'supperAdmin' | 'customer';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  
  city: string;
  district: string;
  thana: string;
  postalCode: number;
  localAddress: string;
}
