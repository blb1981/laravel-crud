import { useRef } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/StateContext";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setToken, setUser } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={passwordConfirmationRef}
          type="password"
          placeholder="Confirm password"
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login now.</Link>
      </p>
    </div>
  );
};
export default Signup;
