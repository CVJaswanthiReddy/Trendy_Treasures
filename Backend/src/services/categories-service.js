import CategoryRepository from "../repository/categories-repository.js";
import slugify from "slugify";

class CategoriesService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(name) {
    try {
      const slug = slugify(name, { lower: true, strict: true });
      const category = await this.categoryRepository.create({ name, slug });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryBySlug(slug) {
    try {
      const category = await this.categoryRepository.findBySlug(slug);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.getAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(slug, name) {
    try {
      const newSlug = slugify(name, { lower: true, strict: true });
      const updatedCategory = await this.categoryRepository.updateBySlug(slug, {
        name,
        slug: newSlug,
      });
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(slug) {
    try {
      const deletedCategory = await this.categoryRepository.deleteBySlug(slug);
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoriesService;
