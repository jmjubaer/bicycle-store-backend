import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '/.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URI,
  supper_admin_password: process.env.SUPER_A_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_token_duration: process.env.JWT_ACCESS_TOKEN_DURATION,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_token_duration: process.env.JWT_REFRESH_TOKEN_DURATION,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
