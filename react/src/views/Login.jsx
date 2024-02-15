import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/StateContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setToken, setUser } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("login attempt");

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };
  return (
    <div>
      <h1>Login</h1>
      {errors && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: ".5rem",
            borderRadius: ".5rem",
            marginBottom: "1rem",
          }}
        >
          {Object.keys(errors).map((key) => (
            <div key={key}>{errors[key][0]}</div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <p>
        Not registered? <Link to="/signup">Create an account.</Link>
      </p>
    </div>
  );
};
export default Login;
