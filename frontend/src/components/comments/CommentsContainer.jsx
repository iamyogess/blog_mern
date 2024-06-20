import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, updateComment } from "../../services/comment";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CommentsContainer = ({
  className,
  loggedinUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });


  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success("Your comment is updated successfully");
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addCommentsHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentsHandler(value)}
        loading={isLoadingNewComment}
      />
      {console.log(userState.userInfo.token)}
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
