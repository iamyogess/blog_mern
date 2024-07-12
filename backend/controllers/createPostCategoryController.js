import Post from "../models/Post.js";
import PostCategories from "../models/PostCategories.js";

const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategories.findOne({ title });

    if (postCategory) {
      const error = new Error("Category is already created!");
      return next(error);
    }

    const newPostCategory = new PostCategories({
      title,
    });
    const savedPostCategory = await newPostCategory.save();

    return res.status(201).json(savedPostCategory);
  } catch (error) {
    next(error);
  }
};

const getPostCategories = async (req, res, next) => {
  try {
    const postCategories = await PostCategories.find({});
    return res.json(postCategories);
  } catch (error) {
    next(error);
  }
};

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryId,
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!postCategory) {
      const error = new Error("Category not found!");
      return next(error);
    }
    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryId;
    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    ); //delete a category that are assigned to posts
    await PostCategories.deleteOne({ _id: categoryId });
    return res.json({ message: "Post Category is deleted!" });
  } catch (error) {
    next(error);
  }
};

export {
  createPostCategory,
  getPostCategories,
  updatePostCategory,
  deletePostCategory,
};
