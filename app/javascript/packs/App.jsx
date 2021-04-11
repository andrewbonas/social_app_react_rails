import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";


const App = () => {
  const [posts, setPosts] = useState([]);


  const addPost = (post) => {
    const allPosts = [post, ...posts];
    setPosts(allPosts);
  }
  useEffect(() => {
    fetch(`/api/v1/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <p>App </p>
      <PostForm addPost={addPost}/>
      <div>
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default App;
