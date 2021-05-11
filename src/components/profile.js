import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    if (isAuthenticated && Object.keys(user).length !== 0) {
      localStorage.setItem("user", JSON.stringify(user));
      userData = user;
    }
    setUserProfile(userData);
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    (isAuthenticated || localStorage.getItem("user") != null) && (
      <div>
        <img src={userProfile.picture} alt={userProfile.name} />
        <h2>{userProfile.name}</h2>
        <p>{userProfile.email}</p>
      </div>
    )
  );
};

export default Profile;
