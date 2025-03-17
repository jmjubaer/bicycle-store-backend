import config from '../config';
import { User } from '../modules/user/user.model';
// Supper admin seeding functionality
const supperAdminData = {
  name: 'Super Admin',
  password: config.supper_admin_password,
  email: 'superadmin@gmail.com',
  role: 'supperAdmin',
};
const seedSupperAdmin = async () => {
  const isSupperAdminExist = await User.findOne({
    role: 'supperAdmin',
  });
  if (!isSupperAdminExist) {
    await User.create(supperAdminData);
  }
};

export default seedSupperAdmin;
