import React from "react";
import "./profileButton.scss";

function ProfileButton() {
  return (
    <button className="profile-button">
      <img
        src="https://avatars.githubusercontent.com/u/73407115?v=4"
        alt="Barış Akgül"
      />
      <span className="content">
        <p className="text">Barış Akgül</p>
        <p className="subtitle">Admin</p>
      </span>
    </button>
  );
}

export { ProfileButton };
