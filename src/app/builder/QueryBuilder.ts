import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((elm) => delete queryObj[elm]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }
  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.queryModel = this?.queryModel.select(fields);
    return this;
  }
  priceRange() {
    const minPrice = Number(this.query?.minPrice);
    const maxPrice = Number(this.query?.maxPrice);

    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      const priceFilter: Record<string, unknown> = {};
      if (!isNaN(minPrice)) priceFilter['$gte'] = minPrice;
      if (!isNaN(maxPrice)) priceFilter['$lte'] = maxPrice;

      this.queryModel = this.queryModel.find({
        price: priceFilter,
      } as FilterQuery<T>);
    }

    return this;
  }
  async countTotal() {
    const totalQueries = this.queryModel.getFilter();
    const total = await this.queryModel.model.countDocuments(totalQueries);
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const totalPage = Math.ceil(total / limit);

    return { limit, page, total, totalPage };
  }
}

export default QueryBuilder;
