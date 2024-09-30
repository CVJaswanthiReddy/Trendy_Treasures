import CrudRepository from "./crud-repository.js";
import Subcategory from "../models/subcategory.js";
class SubcategoryRepository extends CrudRepository {
  constructor() {
    super(Subcategory);
  }

  async findBySlug(slug) {
    return await Subcategory.findOne({ slug });
  }
  async updateBySlug(slug, updateData) {
    return await Subcategory.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });
  }
  async deleteBySlug(slug) {
    return await Subcategory.findOneAndDelete({ slug });
  }
}

export default SubcategoryRepository;
