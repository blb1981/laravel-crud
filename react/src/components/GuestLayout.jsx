import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
import axiosClient from "../axios-client";

const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  } else {
    //
  }

  return (
    <div style={{ width: "600px", marginInline: "auto" }}>
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
        </ul>
      </header>
      <Outlet />
    </div>
  );
};
export default GuestLayout;
