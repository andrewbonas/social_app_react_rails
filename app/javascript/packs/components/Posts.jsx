import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Posts = (props) => {
  const [comments, setComments] = useState([]);
  const postId = props.post.id;

  const updateComment = (comment) => {
    const allComments = [comment, ...comments];
    setComments(allComments);
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
    fetch(`/api/v1/posts/${postId}/comments`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setComments(data))

      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="post-ctn">
      <div className="post border  p-2 mt-3">
        <div className="font-weight-bold">{props.post.user.username}</div>
        <div className="d-flex flex-row justify-content-between">
          <div>{props.post.body}</div>
          <button onClick={deletePost} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
        <CommentForm updateComment={updateComment} postId={postId} />
        <div>
          {comments.map((comment) =>
            postId !== comment.post_id ? null : (
              <Comment
                key={comment.id}
                comments={comment}
                updateComment={updateComment}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
