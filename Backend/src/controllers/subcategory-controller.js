import SubcategoryService from "../services/subcategory-service.js";

const subcategoryService = new SubcategoryService();

export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = await subcategoryService.createSubcategory(
      name,
      categoryId
    );
    return res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: subcategory,
    });
  } catch (error) {
    console.log("Error in createSubcategory:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create subcategory",
      err: error,
    });
  }
};

export const getSubcategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const subcategory = await subcategoryService.getSubcategoryBySlug(slug);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error.message,
    });
  }
};

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();
    return res.status(200).json({
      success: true,
      data: subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { slug } = req.params; // Get slug from route
    const { name, categoryId } = req.body; // Get the new data from the body
    const updatedSubcategory = await subcategoryService.updateSubcategory(
      slug,
      name,
      categoryId
    );
    if (!updatedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: updatedSubcategory,
    });
  } catch (error) {
    console.error("Error in updateSubcategory:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update subcategory",
      error,
    });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedSubcategory = await subcategoryService.deleteSubcategory(slug);
    if (!deletedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: deletedSubcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete subcategory",
      err: error,
    });
  }
};
