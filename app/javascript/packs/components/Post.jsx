import React, { useState } from "react";

const Post = (props) => {
  return (
    <div className="post-ctn">
      <div className="post">
        <div>{props.post.body}</div>
      </div>
    </div>
  );
};

export default Post;
