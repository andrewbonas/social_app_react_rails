import React, { useState, useEffect } from "react";
import axios from "axios";

const User = (props) => {
  // re-organize components folder
  const [currentUser, setCurrentUser] = useState(false);
  const [following, setFollowing] = useState(false);

  const follow = (id) => {
    console.log(props.user.id, "11");
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

  useEffect(() => {
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
      <div className="post border  p-2 mt-3">
        <div className="font-weight-bold">{props.user.username}</div>
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
        <div className="d-flex flex-row justify-content-between">
          <div>Followers: {props.user.followers_count}</div>
          <div>Following: {props.user.follow_count}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
