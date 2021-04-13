import React, { useState } from "react";
import axios from "axios";

const Posts = (props) => {
  const deletePost = () => {
    axios
      .delete(`/api/v1/posts/${props.post.id}`)
      .then((res) => {
        props.updatePost(props.post.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="post-ctn">
      <div className="post border  p-2 mt-3">
        <div>{props.post.user_id}</div>
        <div className="d-flex flex-row justify-content-between">
          <div>{props.post.body}</div>
          <button onClick={deletePost} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
