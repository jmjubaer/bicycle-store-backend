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
  const result = await userServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User get successfully',
    data: result,
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

export const userControllers = {
  createUser,
  getAllUser,
  changeRole,
  changeStatus,
};
