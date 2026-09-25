import React from "react";

const UserCard = ({
  name = "Sareen Kaur",
  phone = "+91 9183947212",
  location = "user address",
}) => {
  return (
    <div className="user-card">
      <img className="user-img" alt="" />
      <h3>{name}</h3>
      <p>{phone}</p>
      <p>{location}</p>
    </div>
  );
};

export default UserCard;