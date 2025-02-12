/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productServices } from './products.services';
import ProductValidationSchema from './products.validation';

// create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // verify product data
    const zodParseData = ProductValidationSchema.parse({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await productServices.createProductIntoDb(zodParseData);

    //  send the response
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error: any) {
    //send the error message when faced any error
    res.status(500).json({
      success: false,
      message: error.name === 'ZodError' ? 'Validation failed' : error.message,
      error: error,
      stack: error.stack,
    });
  }
};

// get all product controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    // Create a search filter if searchTerm is provided
    const filter = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for name
            { brand: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for brand
            { type: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for type
          ],
        }
      : {};

    const result = await productServices.getAllProductsFromDb(filter);
    //  send the response
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    //send the error message when faced any error
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
      stack: error.stack,
    });
  }
};
// get single product controller
const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductsFromDb(productId);
    // send the response
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    // send the error message when face any error
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    }
  }
};
// update product controller
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await productServices.updateProductsFromDb(
      productId,
      updateData,
    );
    // send the response
    res.status(200).json({
      success: true,
      message: 'Bicycles updated successfully',
      data: result,
    });
  } catch (error: any) {
    // send the error message when face any error
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    }
  }
};

// delete product controller
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productServices.deleteProductsFromDb(productId);
    // send the response
    res.status(200).json({
      success: true,
      message: 'Bicycles deleted successfully',
      data: {},
    });
  } catch (error: any) {
    // send the error message when face any error
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    }
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
};
