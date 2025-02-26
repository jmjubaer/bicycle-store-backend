import { productServices } from './products.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await productServices.createProductIntoDb(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await productServices.getAllProductsFromDb(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

const getSingleProducts = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getSingleProductsFromDb(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result,
  });
});
const getRelatedProducts = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getRelatedProductsFromDb(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;
  const result = await productServices.updateProductsFromDb(
    productId,
    updateData,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles updated successfully',
    data: result,
  });
});

// delete product controller

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.deleteProductsFromDb(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles delete successfully',
    data: result,
  });
});
export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
};
