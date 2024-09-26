import CategoriesService from "../services/categories-service.js";

const categoriesService = new CategoriesService();

export const createCategory = async (req, res) => {
  try {
    const category = await categoriesService.createCategory(req.body.name);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      err: error,
    });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await categoriesService.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    console.log("Updating category:", slug, "with new name:", name);

    const updatedCategory = await categoriesService.updateCategory(slug, name);

    console.log("Updated category result:", updatedCategory);
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      err: error.message || error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("Deleting category with slug:", slug);

    const deletedCategory = await categoriesService.deleteCategory(slug);

    console.log("Deleted category result:", deletedCategory);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      err: error.message || error,
    });
  }
};
