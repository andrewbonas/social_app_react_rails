import React, { useState, useEffect, useRef } from "react";
import User from "./User";
import axios from "axios";
import Spinner from "./Spinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useRef();

  useEffect(() => {
    setLoading(true);
    getAllUsers();
    getCurrentUser();
    setLoading(false);
  }, []);

  const getAllUsers = () => {
    fetch(`/api/v1/users`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.log(error.message));
  };

  const getCurrentUser = () => {
    axios
      .get(`/api/v1/users/2`)
      .then((response) => (currentUser.current = response.data));
  };

  return (
    <div>
      <div className=" mt-2 display-4">Users</div>
      {!loading && (
        <div>
          <div>
            {users.map((user) => (
              <User
                key={user.id}
                user={user}
                currentUser={currentUser.current}
              />
            ))}
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

export default Users;
