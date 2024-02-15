import { useRef } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/StateContext";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setToken, setUser } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <div>
      <h1>Sign Up</h1>

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
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}

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
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login now.</Link>
      </p>
    </div>
  );
};
export default Signup;
