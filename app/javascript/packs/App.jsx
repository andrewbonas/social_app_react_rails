import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import Spinner from "./components/Spinner";


const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


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
    setLoading(true)
    fetch(`/api/v1/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.log(error.message))
      setLoading(false)
  }, []);

  return (
    <div>
       {!loading && ( 
        <div>
      <PostForm updatePost={updatePost}/>
      <div>
        {posts.map((post) => (
          <Posts key={post.id} post={post} updatePost={updatePost} />
        ))}
      </div>
      </div>
      )}
      {loading && (
        <div>
          <Spinner/>
          </div>
      )}
    </div>
  );
};

export default App;
