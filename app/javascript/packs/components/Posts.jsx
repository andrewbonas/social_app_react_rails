import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Posts = (props) => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const postId = props.post.id;

  const updateComment = (comment) => {
    if (typeof comment === "number" && comment % 1 === 0) {
      const allComments = comments.filter((c) => c.id !== comment);
      setComments(allComments);
    } else {
      const allComments = [comment, ...comments];
      setComments(allComments);
    }
  };

  const deletePost = () => {
    axios
      .delete(`/api/v1/posts/${postId}`)
      .then((res) => {
        props.updatePost(props.post.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments();
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    axios
      .get(`/api/v1/users/1`)
      .then((response) => setCurrentUser(response.data));
  };

  const getComments = () => {
    fetch(`/api/v1/posts/${postId}/comments`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="post-ctn card-custom m-3">
      <div className="post p-2 mt-3">
        <div className="font-weight-bold">{props.post.user.username}</div>
        <div className="d-flex flex-row justify-content-between">
          <div>{props.post.body}</div>
          {currentUser !== undefined &&
          currentUser.current_user.id === props.post.user_id ? (
            <button onClick={deletePost} className="btn btn-sm btn-danger mr-2">
              Delete
            </button>
          ) : null}
        </div>
        <CommentForm updateComment={updateComment} postId={postId} />
        <div>
          {comments.map((comment) =>
            postId !== comment.post_id ? null : (
              <Comment
                key={comment.id}
                comments={comment}
                updateComment={updateComment}
                postId={postId}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
