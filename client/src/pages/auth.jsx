import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Auth = () => {
  return (
    <div className="auth">
      {" "}
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
      toast.success(`Hello ${username}! have a great day!`, {
        theme: "dark",
        position: "bottom-center",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Incorrect Information, Please try again!", {
          theme: "dark",
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="button-49">
          Login
        </button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const clearInputs = () => {
    setPassword("");
    setUsername("");
  };
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      toast.success("Registration Completed! Now login.", {
        theme: "dark",
        position: "bottom-center",
      });
      clearInputs();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.warning("User already registered. Please try another username.", {
          theme: "dark",
          position: "bottom-center",
        });
        console.log("already in the system");
        clearInputs();
      } else {
        console.error(error);
        toast.error("Registration failed. Please try again.", {
          theme: "dark",
          position: "bottom-center",
        });
        clearInputs();
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="button-49">
          Register
        </button>
      </form>
    </div>
  );
};
