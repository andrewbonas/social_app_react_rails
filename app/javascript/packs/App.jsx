import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";


const App = () => {
  const [posts, setPosts] = useState([]);


  const updatePost = (post) => {
    if(typeof post === 'number' && (post%1)===0){
      console.log(posts);
      const allPosts = posts.filter(p => p.id !== post);
      setPosts(allPosts);
    } else {
    const allPosts = [post, ...posts];
    setPosts(allPosts);
  }
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
      <PostForm updatePost={updatePost}/>
      <div>
        {posts.map((post) => (
          <Posts key={post.id} post={post} updatePost={updatePost} />
        ))}
      </div>
    </div>
  );
};

export default App;
