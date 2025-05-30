import { TProduct } from './products.interface';
// product model
import { Product } from './products.model';
import QueryBuilder from '../../builder/QueryBuilder';
// add product into database
const createProductIntoDb = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
// get all products form database
const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find().populate('reviews'),
    query,
  )
    .fields()
    .filter()
    .paginate()
    .sort()
    .priceRange()
    .search(['brand', 'name', 'type', 'model']);
  const result = await productQuery.queryModel;
  const meta = await productQuery.countTotal();
  return { result, meta };
};
// get single product
const getSingleProductsFromDb = async (id: string) => {
  const result = await Product.findById(id).populate({
    path: 'reviews',
    populate: {
      path: 'reviewer',
    },
  });
  if (!result?._id) {
    throw new Error('Product not found');
  }
  return result;
};
const getRelatedProductsFromDb = async (productId: string) => {
  // Find the product by ID to get its category/type
  const currentProduct = await Product.findById(productId);
  if (!currentProduct) {
    throw new Error('Product not found');
  }

  // Fetch related products with the same category/type, excluding the current product
  const relatedProducts = await Product.find({
    category: currentProduct.category, // Match products of the same category
    _id: { $ne: productId }, // Exclude the current product
  }).populate('reviews');

  return relatedProducts;
};
// update product
const updateProductsFromDb = async (id: string, payload: TProduct) => {
  // update product with given id with new data
  let updatedProduct;
  if (payload?.quantity && payload?.quantity > 0) {
    updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price: payload.price, quantity: payload.quantity, inStock: true },
      { new: true },
    );
  } else if (payload?.quantity == 0) {
    updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...payload, inStock: false },
      { new: true },
    );
  } else {
    updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true },
    );
  }
  // get the updated product
  if (!updatedProduct) {
    throw new Error('Product not found');
  }
  return updatedProduct;
};

// delete product
const deleteProductsFromDb = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
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
  getRelatedProductsFromDb,
};
