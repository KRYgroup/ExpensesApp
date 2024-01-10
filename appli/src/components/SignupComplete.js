import React from "react";
import { Link } from "react-router-dom";

const SignupComplete = () => {
  return (
    <div>
      <h2>Thank you for Signing Up!</h2>
      <p>Your account has been created. You can now log in to get started.</p>
      <Link to="/login">Log in here</Link>
    </div>
  );
};

export default SignupComplete;
