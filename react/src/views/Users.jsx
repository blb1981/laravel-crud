import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

import UserRow from "../components/UserRow";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, isLoading] = useState(false);

  const getUsers = () => {
    isLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        isLoading(false);
      });
  };

  const handleDelete = (id) => {
    console.log(`Deleting user with id ${id}`);
    axiosClient
      .delete(`/users/${id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Users</h1>
      <div
        style={{
          backgroundColor: "gray",
          color: "white",
          marginBottom: "1rem",
        }}
      >
        <Link to="/users/new" style={{ color: "white" }}>
          Add New
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
