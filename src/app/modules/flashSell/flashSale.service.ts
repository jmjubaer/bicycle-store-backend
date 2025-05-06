import QueryBuilder from '../../builder/QueryBuilder';
import { TAddFlashSale } from './flashSale.interface';
import { Product } from '../products/products.model';

const createFlashSale = async (payload: TAddFlashSale) => {
  const { product, discountPercentage } = payload;

  // Update each product with the discount
  const updatedProducts = await Promise.all(
    product.map((productId) =>
      Product.findByIdAndUpdate(
        productId,
        { discount: discountPercentage },
        { new: true },
      ),
    ),
  );

  return updatedProducts;
};

const getActiveFlashSalesService = async (query: Record<string, unknown>) => {
  const flashSaleQuery = new QueryBuilder(
    Product.find({ discount: { $gt: 0 } }).populate('reviews'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate()
    .priceRange();

  const data = await flashSaleQuery.queryModel;
  const meta = await flashSaleQuery.countTotal();

  return {
    meta,
    data,
  };
};
// Update product discount
const updateFlashSale = async (id: string, discountPercentage: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { discount: Number(discountPercentage) },
    { new: true },
  );
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

// Get single product with discount info
const getSingleFlashSaleProduct = async (id: string) => {
  const result = await Product.findOne({ _id: id, discount: { $gt: 0 } });
  if (!result) {
    throw new Error('Product not found or not in flash sale');
  }
  return result;
};

// Remove discount from product (i.e., delete flash sale)
const deleteFlashSaleProduct = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { discount: 0 },
    { new: true },
  );
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

export const FlashSaleService = {
  createFlashSale,
  getActiveFlashSalesService,
  updateFlashSale,
  deleteFlashSaleProduct,
  getSingleFlashSaleProduct,
};
