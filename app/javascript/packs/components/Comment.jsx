import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Comment = (props) => {
  const deleteComment = () => {
    axios
      .delete(`/api/v1/posts/${props.postId}/comments/${props.comments.id}`)
      .then((res) => {
        props.updateComment(props.comments.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="post-ctn">
      {props.comments.body && (
        <div className="post border  p-2 mt-3">
          <div className="font-weight-bold">{props.comments.user.username}</div>
          <div className="d-flex flex-row justify-content-between">
            <div>{props.comments.body}</div>
            <button onClick={deleteComment} className="btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
