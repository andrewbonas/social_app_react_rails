import React, { useState } from "react";
import axios from "axios";

const PostForm = (props) => {
  const [postData, setPostData] = useState("");

  const createPost = () => {
    axios
      .post("/api/v1/posts", {
        post: {
          body: postData,
        },
      })
      .then((res) => {
        const post = res.data;
        props.updatePost(post);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setPostData("");
  };

  const handleChange = (e) => {
    setPostData(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="post-form-ctn form-group card-custom m-3">
          <label htmlFor="post">Create Post:</label>
          <textarea
            type="text"
            className="form-control"
            value={postData}
            onChange={handleChange}
            id="post-text"
            rows="3"
          ></textarea>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-primary m-1 mr-3 d-flex justify-content-end"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
