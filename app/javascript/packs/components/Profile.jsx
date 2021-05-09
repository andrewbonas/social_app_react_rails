import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Posts from "./Posts";
import Spinner from "./Spinner";

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const userId = parseInt(props.match.params.id);
  const [user, setUser] = useState();
  const [userAvatar, setUserAvatar] = useState("");
  const [posts, setPosts] = useState();

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
    getUser();
    getUserAvatar();
    getPosts();
    setLoading(false);
  }, []);

  const getUser = () => {
    axios
      .get(`/api/v1/users/${userId}`)
      .then((response) => setUser(response.data));
  };

  const getUserAvatar = () => {
    axios
      .get(`/api/v1/users/${userId}`)
      .then((response) => setUserAvatar(response.data.avatar));
  };

  const getPosts = () => {
    fetch(`/api/v1/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="post-ctn">
      {!loading && (
        <div>
          <div className="d-flex align-items-center h4">
            <img
              className="rounded-circle ml-2 border-white img-thumbnail photo"
              src={`http://localhost:3000/${userAvatar}`}
            />
            {user !== undefined ? (
              <div>{user.current_user.username}</div>
            ) : null}
          </div>
          {posts !== undefined
            ? posts.map((post) =>
                userId === post.user_id ? (
                  <Posts key={post.id} post={post} updatePost={updatePost} />
                ) : null
              )
            : null}
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

export default Profile;
