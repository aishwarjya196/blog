import React, { useState, useEffect } from "react";
import "./Auth.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSignUpData } from "./sigup.duck";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const dispatch = useDispatch();
  const formStatusCode = useSelector(
    (state) => state.formReducer.formStatusCode
  );
  useEffect(() => {
    if (formStatusCode === 200) {
      navigate("/");
      setSignUpError(null);
    } else {
      setSignUpError(formStatusCode);
    }
  }, [formStatusCode]);

  const [signUpError, setSignUpError] = useState(null);
  const [signUpUser, setSignUpUser] = useState({
    name: "",
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const accountHandle = () => {
    navigate("/");
  };
  const handleInputChange = (e) => {
    setSignUpUser({ ...signUpUser, [e.target.name]: e.target.value });
  };
  const signUpButton = async (e) => {
    e.preventDefault();
    dispatch(getSignUpData(signUpUser));
    console.log(156, formStatusCode);
  };
  return (
    <div>
      {" "}
      <div className="outerBox">
        <div className="heading">
          <div>Blog</div>
          <div>Create your space</div>
        </div>
        <div className="formSection">
          <form>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              name="userName"
              id="username"
              onChange={handleInputChange}
            />
            <br />
            <div>
              {signUpError &&
                signUpError !== 200 &&
                (signUpError === 422 ? "User already exists" : "Signup failed")}
            </div>
            <input
              type="text"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={handleInputChange}
            />
            <br />
            <button
              className={classNames("button", "accountButton")}
              type="submit"
              onClick={signUpButton}>
              Sign Up
            </button>
            <div className="or">OR</div>
            <button className="button" type="button" onClick={accountHandle}>
              Already have an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
