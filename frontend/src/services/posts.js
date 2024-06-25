import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data,headers } = await axios.get("http://localhost:5000/api/posts/");
    return {data,headers};
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
