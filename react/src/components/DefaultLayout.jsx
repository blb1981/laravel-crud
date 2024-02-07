import { Outlet, Navigate, Link } from "react-router-dom";

import { useStateContext } from "../contexts/StateContext";

const DefaultLayout = () => {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("log out");
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
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
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
