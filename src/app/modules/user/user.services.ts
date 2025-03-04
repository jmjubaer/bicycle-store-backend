import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .paginate()
    .fields()
    .filter()
    .sort()
    .search(['name']);
  const result = await userQuery.queryModel;
  const meta = await userQuery.countTotal();
  return { result, meta };
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
const getMe = async (email: string) => {
  const result = await User.findOne({ email });

  return result;
};
const updateNameIntoDB = async (email: string, name: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await User.findOneAndUpdate(
    { email },
    { name },
    { new: true },
  );
  return result;
};
export const userServices = {
  getMe,
  updateNameIntoDB,
  createUserIntoDB,
  getAllUserFromDB,
  changeUserRoleFromDB,
  changeUserStatusFromDB,
};
