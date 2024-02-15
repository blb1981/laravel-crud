import { Outlet, Navigate, Link } from "react-router-dom";

import { useStateContext } from "../contexts/StateContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => setUser(data));
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div>
      <header>
        <ul
          style={{
            display: "flex",
            margin: 0,
            listStyle: "none",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <span>Hi {user.name}</span>
            {", "}
            <a href="/logout" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </header>

      <Outlet />
    </div>
  );
};
export default DefaultLayout;
