import React, { useState } from "react";
import { changePasswordOnFirstLogin } from "../ChangePasswordServiceProvider";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await changePasswordOnFirstLogin(
        username,
        email,
        oldPassword,
        newPassword
      );

      if (response && response.AuthenticationResult) {
        sessionStorage.setItem(
          "authResult",
          JSON.stringify(response.AuthenticationResult)
        );
        setSuccess("Password changed successfully.");
        setError("");
        navigate("/login");
      } else {
        setError("Failed to change password.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Password change failed:", error);
      setError(error.message || "Failed to change password.");
      setSuccess("");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ChangePassword;
