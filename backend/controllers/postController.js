import Post from "../models/Post.js";
import { fileRemover } from "../utils/fileRemover.js";
import { uploadPicture } from "../middlewares/uploadPictureMiddleware.js";
import { v4 as uuid4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuid4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });
    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};
const updatePost = async (req, res, next) => {
  try {
    const post = new Post.findOne({ slug: req.params.slug });

  } catch (error) {
    next(error);
  }
};

export { createPost,updatePost };
