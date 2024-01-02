import React, { useState, useEffect } from "react";
import "./UserDetail.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const api_base_url = "http://localhost:5000";

function Home() {
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const getUserDetail = axios.post(`${api_base_url}/getUserDetail`, {
      userId,
    });
    getUserDetail
      .then((res) => console.log(122, setUserDetail(res.data.getUser)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {userDetail === null ? (
        <div className="user">No user found</div>
      ) : (
        <div className="user">
          <h2>User Detail</h2>
          <div className="userDetail">
            <div>Name</div>
            <div>{userDetail.name}</div>
          </div>
          <div className="userDetail">
            <div>UserName</div>
            <div>{userDetail.userName}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
