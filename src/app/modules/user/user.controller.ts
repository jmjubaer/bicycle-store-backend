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

export const userControllers = {
  createUser,
  getAllUser,
};
