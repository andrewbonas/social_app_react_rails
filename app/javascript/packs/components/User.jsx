import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = (props) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [following, setFollowing] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  const follow = (id) => {
    axios
      .get(`/api/v1/users/${id}/follow`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unFollow = (id) => {
    axios
      .get(`/api/v1/users/${id}/unfollow`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserAvatar = () => {
    axios
      .get(`/api/v1/users/${props.user.id}`)
      .then((response) => setUserAvatar(response.data.avatar));
  };

  useEffect(() => {
    getUserAvatar();
    updateFollow();
  }, []);

  const updateFollow = () => {
    const user = props.user;
    const currentUser = props.currentUser;
    if (user.id === currentUser.id) {
      setCurrentUser(true);
    }
    for (var i = 0; i < user.user_followers.length; i++) {
      if (
        user.user_followers[i].id !== undefined &&
        user.user_followers[i].id === currentUser.id
      ) {
        setFollowing(true);
      }
    }
  };

  return (
    <div className="post-ctn">
      <div className="post border p-2 mt-3">
        <div className="h4">{props.user.username}</div>
        <div className="d-flex align-items-center justify-content-between">
          <img
            className="rounded-circle  border-white img-thumbnail photo"
            src={`https://sheltered-lake-01053.herokuapp.com/${userAvatar}`}
          />
          <div className="d-flex flex-column align-items-end">
            <Link to={`/user/${props.user.id}`}>View Profile</Link>
            {!currentUser && (
              <div>
                {!following && (
                  <div>
                    <a href="#" onClick={() => follow(props.user.id)}>
                      Follow
                    </a>
                    <br />
                  </div>
                )}
                {following && (
                  <div>
                    <a href="#" onClick={() => unFollow(props.user.id)}>
                      unFollow
                    </a>
                  </div>
                )}
              </div>
            )}
            <div>Followers: {props.user.followers_count}</div>
            <div>Following: {props.user.follow_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
