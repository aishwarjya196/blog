import React, { useState, useEffect } from "react";
import "./Auth.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSignUpStatus, getLoginData } from "./sigup.duck";

function Login() {
  const loginFormStatusCode = useSelector(
    (state) => state.formReducer.loginFormStatusCode
  );
  const jwtAuthCode = useSelector((state) => state.formReducer.jwtAuthCode);
  const loginFormMsg = useSelector((state) => state.formReducer.loginFormMsg);
  useEffect(() => {
    dispatch(changeSignUpStatus(null));
  }, []);
  useEffect(() => {
    if (jwtAuthCode) {
      localStorage.setItem("jwtToken", jwtAuthCode);
      navigate("/home");
    }
  }, [jwtAuthCode]);

  const dispatch = useDispatch();
  const formStatusCode = useSelector((state) => state);
  const [loginUser, setLoginUser] = useState({ userName: "", password: "" });
  const handleInputChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const accountHandle = () => {
    navigate("/signup");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(getLoginData(loginUser));
  };
  return (
    <div className="outerBox">
      <div className="heading">
        <div>Blog</div>
        <div>Create your space</div>
      </div>
      <div className="formSection">
        <form>
          <input
            type="text"
            placeholder="Enter Username"
            name="userName"
            id="userName"
            onChange={handleInputChange}
          />
          <br />

          <input
            type="text"
            placeholder="Enter Password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
          <br />
          <button className="button" type="button" onClick={handleLogin}>
            Sign In
          </button>
          <div>{loginFormMsg !== "" && loginFormMsg}</div>
          <div className="or">OR</div>
          <button
            className={classNames("button", "accountButton")}
            type="button"
            onClick={accountHandle}>
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
