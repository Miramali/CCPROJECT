import "./style.css";
import { React, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Localhost } from "../../config/api";
import { loginFailure, loginStart, loginSuccess } from "../../features/user";
import { Error, Success } from "../../components/Toast";
import Logo from "../../components/logo";

export const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState("Show");
  const [passType, setPassType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    if (email.value !== "" && password.value !== "") {
      try {
        const res = await axios.post(
          `${Localhost}/api/auth/login`,
          {
            email: email.value,
            password: password.value,
          },
          { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        navigate("/Profiles");
        Success('login succufully')
      } catch (err) {
        dispatch(loginFailure());
        Error('login failed')
      }
    }
  };

  const togglePassword = () => {
    if (pass !== "" && show === "Show") {
      setShow("Hide");
      setPassType("text");
    } else if (show === "Hide") {
      setShow("Show");
      setPassType("password");
    }
  };

  const checkAuth = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    if (email.value === "") {
      email.style.border = "thin solid #e01b24";
      document.getElementById("error1").style.display = "block";
    }
    if (password.value === "") {
      password.style.border = "thin solid #e01b24";
      document.getElementById("icon-pass-1").style.display = "none";
      document.getElementById("error2").style.display = "block";
    } else {
      email.style.border = "none";
      password.style.border = "none";
      email.style.borderBottom = "thin solid #fed049";
      password.style.borderBottom = "thin solid #fed049";
    }
  };
  const changeEmailInput = (e) => {
    setEmail(e.target.value);
    let email = document.getElementById("email");
    if (email.value !== "") {
      document.getElementById("error1").style.display = "none";
    }
  };
  const changePassInput = (e) => {
    setPass(e.target.value);
    let password = document.getElementById("password");

    if (password.value !== "") {
      document.getElementById("icon-pass-1").style.display = "block";
      document.getElementById("error2").style.display = "none";
    }
  };

  // start sign in with google

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      dispatch(loginSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };

  const google = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
    getUser();
  };

  const github = () => {
    window.open(`http://localhost:5000/auth/github/callback`, "_self");
  };

  const facebook = () => {
    window.open(`http://localhost:5000/auth/facebook/callback`, "_self");
  };

  return (
    <div>
      <Logo/>
      <div className="all">
        <div className="auth-form-container item">
          <h3>Login</h3>
          <form className="login-form d-flex flex-column form" onSubmit={handleSubmit}>
            <div className="pass-container">
              <input
                className="inp-field"
                value={email}
                onChange={changeEmailInput}
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
              <FaExclamationTriangle id="error1" className="error-triangle" />
            </div>
            <div className="pass-container">
              <input
                className="inp-field pass"
                value={pass}
                onChange={changePassInput}
                type={passType}
                placeholder="Password"
                id="password"
                name="password"
                required
              />
              <span id="icon-pass-1" className="toggle" onClick={togglePassword}>
                {show}
              </span>
              <FaExclamationTriangle id="error2" className="error-triangle" />
            </div>
            <Link to={"/forgetpassword"} className="link-btn forget">
              Forgot your password ?
            </Link>
            <button
              className="btn rounded-pill m-auto my-3 log"
              type="submit"
              onClick={checkAuth}
            >
              <p className="text-white button">Login</p>
            </button>
          </form>
          <div className="login-social">
            <p style={{ fontSize: "18px" }}>Or login with </p>
            <button className="soc-log-btn" onClick={github}>
              <FaLinkedinIn />
            </button>
            <button className="soc-log-btn" onClick={google}>
              <FaGoogle />
            </button>
            <button className="soc-log-btn" onClick={facebook}>
              <FaFacebookF />
            </button>
          </div>
          <div className="switch1">
            <p style={{ fontSize: "15px" }}>Not a member yet ? </p>
            <button
              className="link-btn"
              onClick={() => props.onFormSwitch("register")}
            >
              click here to sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
