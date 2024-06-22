import axios from "axios";

export const createComment = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Token:", token);

    const { data } = await axios.post(
      "http://localhost:5000/api/comments/",
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error("Error response:", error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error("Error message:", error.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ token, desc, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Token:", token);

    const { data } = await axios.put(
      `http://localhost:5000/api/comments/${commentId}`,
      {
        desc,
      },
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error("Error response:", error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error("Error message:", error.message);
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Token:", token);

    const { data } = await axios.delete(
      `http://localhost:5000/api/comments/${commentId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error("Error response:", error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error("Error message:", error.message);
    throw new Error(error.message);
  }
};
