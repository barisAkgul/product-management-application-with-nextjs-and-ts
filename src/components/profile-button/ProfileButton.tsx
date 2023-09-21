import React from "react";
import "./profileButton.scss";

function ProfileButton() {
  return (
    <button className="profile-button">
      <img
        src="https://avatars.githubusercontent.com/u/60665510?v=4"
        alt="Mehmet Pekcan"
      />
      <span className="content">
        <p className="text">Mehmet Pekcan</p>
        <p className="subtitle">Admin</p>
      </span>
    </button>
  );
}

export { ProfileButton };
