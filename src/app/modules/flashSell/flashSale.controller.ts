import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FlashSaleService } from './flashSale.service';
import sendResponse from '../../utils/sendResponse';

const createFlashSale = catchAsync(async (req: Request, res: Response) => {
  const result = await FlashSaleService.createFlashSale(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Flash Sale created successfully',
    data: result,
  });
});

const getAllFlashSale = catchAsync(async (req: Request, res: Response) => {
  const result = await FlashSaleService.getActiveFlashSalesService(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Flash Sale get succesfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleFlashSale = catchAsync(async (req: Request, res: Response) => {
  const result = await FlashSaleService.getSingleFlashSaleProduct(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Flash Sale getting succesfully',
    data: result,
  });
});

const updateFlashSale = catchAsync(async (req: Request, res: Response) => {
  const discountPercentage = req.body.discountPercentage;
  const id = req.params.id;
  const result = await FlashSaleService.updateFlashSale(id, discountPercentage);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Flash Sale updated successfully',
    data: result,
  });
});
const deleteFlashSale = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FlashSaleService.deleteFlashSaleProduct(id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Flash Sale product deleted successfully',
    data: result,
  });
});
export const FlashSaleController = {
  createFlashSale,
  getAllFlashSale,
  updateFlashSale,
  deleteFlashSale,
  getSingleFlashSale
};
