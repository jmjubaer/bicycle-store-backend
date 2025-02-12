import { TProduct } from './products.interface';
import { ObjectId } from 'mongodb';
// product model
import { Product } from './products.model';
// add product into database
const createProductIntoDb = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
// get all products form database
const getAllProductsFromDb = async (filter: object) => {
  const result = await Product.find(filter);
  return result;
};
// get single product
const getSingleProductsFromDb = async (id: string) => {
  const result = await Product.findOne({ _id: new ObjectId(id) });
  if (!result?._id) {
    throw new Error('Product not found');
  }
  return result;
};

// update product
const updateProductsFromDb = async (id: string, updateData: TProduct) => {
  // update product with given id with new data
  await Product.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  );
  // get the updated product

  const updatedProduct = await Product.findOne({ _id: new ObjectId(id) });
  if (!updatedProduct) {
    throw new Error('Product not found');
  }
  return updatedProduct;
};

// delete product
const deleteProductsFromDb = async (id: string) => {
  const result = await Product.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount < 1) {
    throw new Error('Product not found');
  }
  return result;
};

export const productServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductsFromDb,
  updateProductsFromDb,
  deleteProductsFromDb,
};
