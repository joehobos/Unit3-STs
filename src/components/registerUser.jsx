import React, { useState } from "react";
import '../App.css'

const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function RegisterUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setSuccessMessage("Registration successful!");
      } else {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <>
      <h2>Sign Up Here</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          minLength="1"
          maxLength="15"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          minLength="1"
          maxLength="15"
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          minLength="1"
          maxLength="15"
          required
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}