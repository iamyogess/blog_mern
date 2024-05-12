import React, { useEffect, useState } from "react";
import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentsContainer = ({ className, loggedinUserId }) => {
  const [comments, setComments] = useState([]);

  const mainComment = comments.filter((comment) => comment.parent == null);
  const [affectedComment, setAffectedComment] = useState(null);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })(); //it runs itself we don't need to call it
  }, []);

  console.log(comments);

  const addCommentsHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };
    setComments((currState) => {
      return [newComment, ...currState];
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    const updatedComments = comments.filter((comment) => {
      return comment._id !== commentId;
    });
    setComments(updatedComments);
  };

  const getRepliesHandler = (commentId) => {
    return comments
      .filter((comment) => comment.parent === commentId)
      .sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime;
      });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentsHandler(value)}
      />
      {/* comments  */}
      <div className="space-y-4 mt-8">
        {mainComment.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedinUserId={loggedinUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentsHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={getRepliesHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
