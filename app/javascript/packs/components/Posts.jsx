import React, { useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";


const Posts = (props) => {
  const [comments, setComments] = useState([]);

  const updateComment = (comment) => {
    if(typeof comment === 'number' && (comment%1)===0){
      console.log(comments);
      const allPosts = comments.filter(c => c.id !== comment);
      setComments(allComments);
    } else {
    const allComments = [comment, ...comments];
    setComments(allComments);
  }
  }


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
        <div className="font-weight-bold" >{props.post.user.username}</div>
        <div className="d-flex flex-row justify-content-between">
          <div>{props.post.body}</div>
          <button onClick={deletePost} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
        <CommentForm updateComment={updateComment} />
      </div>
    </div>
  );
};

export default Posts;
