import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";


const Profile = (props) => {
  const [loading, setLoading] = useState(false);
 const userId = parseInt(props.match.params.id)
 const [user, setUser] = useState()
 const [posts, setPosts] = useState()


  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
      setLoading(false);
  }, []);

const getUser = () => {
  axios.get(`/api/v1/users/${userId}`)
  .then((response) => setUser(response.data))
};

const getPosts = () => {
  fetch(`/api/v1/posts`)
    .then((response) => {
      return response.json();
    })
    .then((data) => setPosts(data))
    .catch((error) => console.log(error.message))
};

  return (
    <div className="post-ctn">

      {posts !== undefined ? posts.map((post) => (
         userId === post.user_id ?
          <Posts key={post.id} post={post} />
          : null
        )) : null}
    </div>
  );
};

export default Profile;