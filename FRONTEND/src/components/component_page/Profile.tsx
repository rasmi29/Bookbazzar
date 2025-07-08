import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../../state/userState";
import { log } from "three/tsl";

const Profile = () => {
  const userData = useRecoilValue(userState);

  return (
    <>
      <div>Email :- {userData?.email}</div>
      <div>Name :- {userData?.name}</div>
      <div>isVerified :- {userData?.isVerified}</div>
      <div>Role :- {userData?.role}</div>
      <div>Created on :- {userData?.createdAt}</div>
    </>
  );
};

export default Profile;

// createdAt
// :
// "2025-06-29T10:44:39.885Z"
// email
// :
// "rasmiranjansahoo702@gmail.com"
// isVerified
// :
// true
// name
// :
// "Rasmiranjan Sahoo"
// role
// :
// "admin"
// updatedAt
// :
// "2025-06-29T10:50:38.432Z"
// __v
// :
// 0
// _id
// :
// "68611917a67d92c73a055f0e"
