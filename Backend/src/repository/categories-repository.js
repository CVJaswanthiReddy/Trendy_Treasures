import Categories from "../models/categories.js";
import CrudRepository from "./crud-repository.js";

class CategoryRepository extends CrudRepository {
  constructor() {
    super(Categories); // Pass the Categories model to the CrudRepository
  }

  // Custom method to find category by slug
  async findBySlug(slug) {
    try {
      const category = await this.model.findOne({ slug });
      return category;
    } catch (error) {
      throw error;
    }
  }
  async updateBySlug(slug, data) {
    try {
      const updatedCategory = await this.model.findOneAndUpdate(
        { slug },
        data,
        {
          new: true, // Return the updated document
        }
      );
      return updatedCategory; // Return the updated category or null if not found
    } catch (error) {
      console.error("Error in updating category:", error);
      throw error; // Rethrow to propagate the error
    }
  }
  async deleteBySlug(slug) {
    try {
      const deletedCategory = await this.model.findOneAndDelete({ slug });
      return deletedCategory; // Returns the deleted category or null if not found
    } catch (error) {
      console.error("Error deleting category in repository:", error);
      throw error; // Rethrow to propagate the error
    }
  }

  // Optionally, if needed, you can still add other custom methods specific to categories
}

export default CategoryRepository;
