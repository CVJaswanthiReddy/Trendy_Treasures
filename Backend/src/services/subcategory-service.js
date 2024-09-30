import SubcategoryRepository from "../repository/subcategory-repository.js";
import slugify from "slugify";
class SubcategoryService {
  constructor() {
    this.subcategoryRepository = new SubcategoryRepository();
  }

  async createSubcategory(name, categoryId) {
    try {
      const slug = slugify(name, { lower: true, strict: true });
      const subcategory = await this.subcategoryRepository.create({
        name,
        category: categoryId,
        slug,
      });
      return subcategory;
    } catch (error) {
      console.log("Error in SubcategoryService:", error);
      throw error;
    }
  }

  async getSubcategoryBySlug(slug) {
    try {
      const subcategory = await this.subcategoryRepository.findBySlug(slug);
      return subcategory;
    } catch (error) {
      throw error;
    }
  }

  async getAllSubcategories() {
    try {
      const subcategories = await this.subcategoryRepository.getAll();
      return subcategories;
    } catch (error) {
      throw error;
    }
  }

  async updateSubcategory(slug, name, categoryId) {
    try {
      // Validate inputs
      if (!slug || !name || !categoryId) {
        throw new Error("Slug, name, and categoryId are required.");
      }

      // Attempt to update the subcategory
      const updatedSubcategory = await this.subcategoryRepository.updateBySlug(
        slug,
        {
          name,
          category: categoryId,
        }
      );

      // Check if the subcategory was found and updated
      if (!updatedSubcategory) {
        throw new Error("Subcategory not found or update failed.");
      }

      return updatedSubcategory;
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating subcategory:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  async deleteSubcategory(slug) {
    try {
      const deletedSubcategory = await this.subcategoryRepository.deleteBySlug(
        slug
      );
      return deletedSubcategory;
    } catch (error) {
      throw error;
    }
  }
}

export default SubcategoryService;
