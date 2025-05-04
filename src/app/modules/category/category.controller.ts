import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.services';

const createCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await categoryServices.createCategoryIntoDb(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});
export const categoryControllers = {
  createCategory,
  getAllCategories,
};
