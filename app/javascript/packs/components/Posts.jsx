import { post } from "jquery";
import React, { useState } from "react";

const Posts = (props) => {

  return (
    <div className="post-ctn">
      <div className="post">
        <div>POST</div>
        <div>{props.post.body}</div>
      </div>
    </div>
  );
};

export default Posts;
