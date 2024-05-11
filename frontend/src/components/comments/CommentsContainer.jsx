import React, { useEffect, useState } from "react";
import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";

const CommentsContainer = ({ className }) => {
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })(); //it runs itself we don't need to call it
  }, []);

  const addCommentsHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((currState) => {
        return [newComment, ...currState]
    })
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentsHandler(value)}
      />
    </div>
  );
};

export default CommentsContainer;
