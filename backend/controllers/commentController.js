import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;
    const post = await Post.findOne({ slug: slug });
    if (!post) {
      const error = new Error("Post not found to comment!");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });
    const savedComment = await newComment.save();

    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

export { createComment };
