import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '/.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URI,
  supper_admin_password: process.env.SUPER_A_PASSWORD,
};
