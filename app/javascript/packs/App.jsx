import React, { useState, useEffect, useRef } from "react";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import Spinner from "./components/Spinner";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  const updatePost = (post) => {
    if (typeof post === "number" && post % 1 === 0) {
      const allPosts = posts.filter((p) => p.id !== post);
      setPosts(allPosts);
    } else {
      const allPosts = [post, ...posts];
      setPosts(allPosts);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
    getCurrentUser();
    setLoading(false);
  }, []);

  const getPosts = () => {
    fetch(`/api/v1/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.log(error.message));
  };

  const getCurrentUser = () => {
    axios
      .get(`/api/v1/users/1`)
      .then((response) => setCurrentUser(response.data));
  };

  return (
    <div>
      {!loading && (
        <div>
          <PostForm updatePost={updatePost} />
          <div>
            {posts.map((post) =>
              currentUser.current_user.id !== undefined && currentUser.current_user.id === post.user_id ? (
                <Posts key={post.id} post={post} updatePost={updatePost} />
              ) : null
            )}
          </div>
        </div>
      )}
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default App;
