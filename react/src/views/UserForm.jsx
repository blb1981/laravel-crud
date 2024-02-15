import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setUser(data.data);
        })
        .catch()
        .finally(() => {
          setIsLoading(false);
          console.log(user);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (user.id) {
      axiosClient
        .put(`/users/${id}`, user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          console.log(err.response.data);
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        })
        .finally(() => {
          setIsFormSubmitted(false);
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          console.log(err.response.data);
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        })
        .finally(() => {
          setIsFormSubmitted(false);
        });
    }
  };

  return (
    <div>
      {!id && <h1>Add User</h1>}
      {id && !isLoading && <h1>Edit: {user.name}</h1>}
      {isLoading && <h1>Loading...</h1>}

      {errors &&
        Object.keys(errors).map((key) => <p key={key}>{errors[key][0]}</p>)}

      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <input
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            type="text"
            placeholder="Name"
          />
          <br />
          <input
            value={user.email}
            type="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Email"
          />
          <br />
          <input
            value={user.password}
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <br />
          <input
            value={user.password_confirmation}
            type="password"
            onChange={(e) =>
              setUser({ ...user, password_confirmation: e.target.value })
            }
            placeholder="Confirm password"
          />
          <br />
          <button disabled={isFormSubmitted} type="submit">
            {id ? "Update" : "Add"}
          </button>
        </form>
      )}
    </div>
  );
};
export default UserForm;
