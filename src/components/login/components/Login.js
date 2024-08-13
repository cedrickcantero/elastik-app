import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  getUserDetails,
  registerUser,
} from "../LoginServiceProvider";

function Login() {
  const [panelActive, setPanelActive] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signInForm, setSignInForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSignUp = () => {
    setPanelActive(true);
  };

  const toggleSignIn = () => {
    setPanelActive(false);
  };

  const handleSignUpChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInChange = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(
        signUpForm.username,
        signUpForm.email,
        signUpForm.password
      );

      if (response?.message == "User signed up successfully") {
        setSignUpForm({
          username: "",
          email: "",
          password: "",
        });
        setPanelActive(false);
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(
        signInForm.username,
        signInForm.password
      );

      if (response?.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        navigate("/change-password");
      } else if (response?.AuthenticationResult) {
        sessionStorage.setItem(
          "authResult",
          JSON.stringify(response.AuthenticationResult)
        );

        const userDetails = await getUserDetails();

        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

        navigate("/home");
      } else {
        console.error("Login failed, no AuthenticationResult received.");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="login-container">
      <section>
        <div
          className={`container ${panelActive ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
              <h1>Sign Up</h1>
              <span>Or use your Email for registration</span>
              <input
                type="text"
                placeholder="Name"
                name="username"
                onChange={handleSignUpChange}
                value={signUpForm.username}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleSignUpChange}
                value={signUpForm.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleSignUpChange}
                value={signUpForm.password}
              />
              <button type="submit" style={{ marginTop: "9px" }}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignInSubmit}>
              <h1>Sign In</h1>
              <span>Or sign in using Username</span>
              <input
                type="text"
                placeholder="Name"
                name="username"
                onChange={handleSignInChange}
                value={signInForm.username}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleSignInChange}
                value={signInForm.password}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Log in</h1>
                <p>Sign in here if you already have an account </p>
                <button
                  className="ghost mt-5"
                  id="signIn"
                  onClick={toggleSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Create, Account!</h1>
                <p>Sign up if you still don't have an account ... </p>
                <button className="ghost" id="signUp" onClick={toggleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
