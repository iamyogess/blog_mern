import axios from "axios";

const getAllCategories = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/post-category"
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.response);
  }
};

export { getAllCategories };
