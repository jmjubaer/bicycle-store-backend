import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUserIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await userServices.getAllUserFromDB(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User get successfully',
    meta: result.meta,
    data: result.result,
  });
});
const changeRole = catchAsync(async (req, res) => {
  const result = await userServices.changeUserRoleFromDB(
    req.params.email,
    req.body.role,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User role change successfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeUserStatusFromDB(
    req.params.email,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User status change successfully',
    data: result,
  });
});
const updateUseProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateProfile(
    req.user.email,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { email } = req.user || {};
  const result = await userServices.getMe(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User getting successfully',
    data: result,
  });
});
const getAllActivitiesSummery = catchAsync(async (req, res) => {
  const result = await userServices.getAllActivitySummeryFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Summery getting successfully',
    data: result,
  });
});
export const userControllers = {
  createUser,
  getAllUser,
  changeRole,
  changeStatus,
  getMe,
  updateUseProfile,
  getAllActivitiesSummery,
};
