import React, { useState } from "react";
import axios from "axios";

const CommentForm = (props) => {
  const [commentData, setCommentData] = useState("");

  const createComment = () => {
    axios
      .post(`/api/v1/posts/${props.postId}/comments`, {
        comment: {
          body: commentData,
        },
      })
      .then((res) => {
        const comment = res.data;
        props.updateComment(comment);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
    setCommentData("");
  };

  const handleChange = (e) => {
    setCommentData(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="post-form-ctn form-group">
          <label htmlFor="post">Comment:</label>
          <textarea
            type="text"
            className="form-control"
            value={commentData}
            onChange={handleChange}
            id="comment-text"
            rows="2"
          ></textarea>
          <button className="btn btn-sm btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
