import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import "../styles/components/Login.scss"; // Import the SCSS file for the component

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // AWS Cognito Authentication Logic
    // Assume you have AWS SDK configured here
    // Example: Using CognitoIdentityServiceProvider for authentication
    const cognito = new AWS.CognitoIdentityServiceProvider();
    // Add your logic to authenticate the user
  };

  const [panelActive, setPanelActive] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Dummy state for authentication

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

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Form data for sign-up:", signUpForm);
    // Replace this with your sign-up logic, e.g., call to an API
    setIsAuthenticated(true); // Simulate successful sign-up
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Form data for sign-in:", signInForm);
    // Replace this with your sign-in logic, e.g., call to an API
    setIsAuthenticated(true); // Simulate successful sign-in
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
              <span>Or sign in using E-Mail Address</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleSignInChange}
                value={signInForm.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleSignInChange}
                value={signInForm.password}
              />
              <a href="#">Forgot your password?</a>
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
