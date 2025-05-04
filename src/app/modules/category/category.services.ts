import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDb = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
// get all category form database
const getAllCategoryFromDb = async () => {
  const result = await Category.find();
  return result;
};

export const categoryServices = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
};
