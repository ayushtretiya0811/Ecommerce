import Category from "../Models/CategoryModel.js";
// export const AddCategoryController = async (req, res) => {
//     try {
//         const { name, description, parentCategoryId } = req.body;
    
//         // Create a new category
//         const newCategory = new Category({
//           name,
//           description,
//           parentCategoryId: parentCategoryId || null  // Handle optional parentCategoryId
//         });
    
//         // Save the category to the database
//         const savedCategory = await newCategory.save();
    
//         res.status(200).json({
//           message: 'Category added successfully',
//           category: savedCategory,
//           success: true
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: 'Error adding category',
//           error: error.message,
//           success: false
//         });
//       }
// }
export const AddCategoryController = async (req, res) => {
  try {
    const { name, description, parent } = req.body;
    
    const newCategory = new Category({
      name,
      description,
      parent: parent || null,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: savedCategory, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};
export const AllCategoryController = async (req, res) => {
  try {
    // Recursive function to fetch a category with all its children
    const getCategoryWithChildren = async (parentId = null) => {
      const categories = await Category.find({ parent: parentId }).lean().exec();

      for (let category of categories) {
        category.children = await getCategoryWithChildren(category._id);
      }

      return categories;
    };

    // Fetch all top-level categories and their nested children
    const categories = await getCategoryWithChildren();

    res.status(200).json({ message: 'Categories fetched successfully', success: true, category:categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while fetching all categories.', success: false });
  }
};
export const allCategoriesDisplayController = async (req, res) => {
  try {
    const allCategories = await Category.find({}).lean().exec();
    res.status(200).send({ message: "All categories fetched successfully", success: true, category: allCategories });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error while fetching categories", success: false });
  }
}
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category to delete
    const categoryToDelete = await Category.findById(id);

    // If the category doesn't exist, return an error
    if (!categoryToDelete) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Find any subcategories associated with the category being deleted
    const subcategories = await Category.find({ parentCategoryId: id });

    // Delete each subcategory
    for (const subcategory of subcategories) {
      await subcategory.deleteOne();
    }

    // Delete the category
    await categoryToDelete.deleteOne();

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category.', error: error.message });
  }
};