import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const changeUserRoleFromDB = async (email: string, role: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await User.findOneAndUpdate(
    { email },
    { role },
    { new: true },
  );
  return result;
};
const changeUserStatusFromDB = async (email: string, status: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await User.findOneAndUpdate(
    { email },
    { status },
    { new: true },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  changeUserRoleFromDB,
  changeUserStatusFromDB
};
