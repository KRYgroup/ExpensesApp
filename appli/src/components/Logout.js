import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    //Deploy Logout function here
    //onLogout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
