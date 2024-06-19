import React, { useEffect, useState } from "react";
import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentsContainer = ({ className, loggedinUserId,comments }) => {
const [affectedComment, setAffectedComment] = useState(null);



  const addCommentsHandler = (value, parent = null, replyOnUser = null) => {
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
  };


  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentsHandler(value)}
      />
      {/* comments  */}
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedinUserId={loggedinUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentsHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
