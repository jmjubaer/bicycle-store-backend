import QueryBuilder from '../../builder/QueryBuilder';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDb = async (data: TReview) => {
  const result = await Review.create(data);
  return result;
};
const getAllReviewsFromDb = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(Review.find(), query)
    .fields()
    .filter()
    .paginate();
  const result = await reviewQuery.queryModel;
  const meta = await reviewQuery.countTotal();
  return { result, meta };
};
const getReviewsForProductFromDb = async (productId: string) => {
  const result = await Review.find({ product: productId });
  return result;
};
// For bad review
const deleteReviewFromDb = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const reviewServices = {
  createReviewIntoDb,
  getAllReviewsFromDb,
  getReviewsForProductFromDb,
  deleteReviewFromDb,
};
