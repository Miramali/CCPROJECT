// import "./style.css";
// import { React, useState } from "react";
// import {
//   FaFacebookF,
//   FaLinkedinIn,
//   FaGoogle,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { loginFailure, loginStart, loginSuccess } from "../../features/user";
// import { Localhost } from "../../config/api";
// import { Success, Error } from "../../components/Toast";

// const Resgister = () => {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [emial, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [name, setName] = useState("");
//   const [confPass, setConfPass] = useState("");
//   const [show, setShow] = useState("Show");
//   const [passType, setPassType] = useState("password");
//   const [show2, setShow2] = useState("Show");
//   const [passType2, setPassType2] = useState("password");

//   const handleSubmit = (e) => {
//     let name = document.getElementById("name");
//     let password = document.getElementById("password");
//     let email = document.getElementById("email");
//     let confirmPass = document.getElementById("conf-password");
//     e.preventDefault();
//     if (
//       name.value !== "" &&
//       email.value !== "" &&
//       password.value !== "" &&
//       confirmPass.value === password.value
//     ) {
//       const payload = { name: name.value, email: email.value };

//       const postUser = async () => {
//         dispatch(loginStart());
//         try {
//           const res = await axios.post(
//             `${Localhost}/api/auth/signup`,
//             {
//               ...payload,
//               password: password.value,
//             },
//             { withCredentials: true }
//           );

//           dispatch(loginSuccess(res.data));
//           // Show success toast message
//           navigate("/login");
//           Success('Registered succufully')
//         } catch (err) {
//           dispatch(loginFailure());
//           Error('Registered failed')
//         }
//       };
//       postUser();
//     }
//   };

//   const togglePassword = () => {
//     if (pass !== "" && show === "Show") {
//       setShow("Hide");
//       setPassType("text");
//       //   console.log(show);
//     } else if (show === "Hide") {
//       setShow("Show");
//       setPassType("password");
//     }
//   };

//   const togglePassword2 = () => {
//     if (confPass !== "" && show2 === "Show") {
//       setShow2("Hide");
//       setPassType2("text");
//       //   console.log(show);
//     } else if (show2 === "Hide") {
//       setShow2("Show");
//       setPassType2("password");
//     }
//   };

//   // start check empty inputs
//   const checkAuth = () => {
//     let name = document.getElementById("name");
//     let password = document.getElementById("password");
//     let email = document.getElementById("email");
//     let confirmPass = document.getElementById("conf-password");
//     if (name.value === "") {
//       name.style.border = "thin solid #e01b24";
//       document.getElementById("error3").style.display = "block";
//     }
//     if (email.value === "") {
//       email.style.border = "thin solid #e01b24";
//       document.getElementById("error5").style.display = "block";
//     }
//     if (password.value === "") {
//       password.style.border = "thin solid #e01b24";
//       document.getElementById("icon-pass-2").style.display = "none";
//       document.getElementById("error4").style.display = "block";
//     }
//     if (confirmPass.value === "") {
//       confirmPass.style.border = "thin solid #e01b24";
//       document.getElementById("icon-pass-3").style.display = "none";
//       document.getElementById("error6").style.display = "block";
//     } else {
//       name.style.border = "none";
//       email.style.border = "none";
//       password.style.border = "none";
//       confirmPass.style.border = "none";
//       name.style.borderBottom = "thin solid #fed049";
//       email.style.borderBottom = "thin solid #fed049";
//       password.style.borderBottom = "thin solid #fed049";
//       confirmPass.style.borderBottom = "thin solid #fed049";
//     }
//   };
//   const changeNameInput = (e) => {
//     setName(e.target.value);
//     let name = document.getElementById("name");
//     if (name.value !== "") {
//       document.getElementById("error3").style.display = "none";
//     }
//   };
//   const changeEmailInput = (e) => {
//     setEmail(e.target.value);
//     let email = document.getElementById("email");
//     if (email.value !== "") {
//       document.getElementById("error5").style.display = "none";
//     }
//   };
//   const changePassInput = (e) => {
//     setPass(e.target.value);
//     let password = document.getElementById("password");

//     if (password.value !== "") {
//       document.getElementById("icon-pass-2").style.display = "block";
//       document.getElementById("error4").style.display = "none";
//     }
//   };
//   const changeConfirmPassInput = (e) => {
//     setConfPass(e.target.value);
//     let confirmPassword = document.getElementById("password");

//     if (confirmPassword.value !== "") {
//       document.getElementById("icon-pass-3").style.display = "block";
//       document.getElementById("error6").style.display = "none";
//     }
//   };

//   const google = () => {
//     window.open(`http://localhost:5000/auth/google/callback`, "_self");
//   };

//   const github = () => {
//     window.open(`http://localhost:5000/auth/github/callback`, "_self");
//   };

//   const facebook = () => {
//     window.open(`http://localhost:5000/auth/facebook/callback`, "_self");
//   };

//   return (
//     <div className="parent">
//       <div className="auth-form-container">
//         <div className="register-head">
//           <h2>Create a new account</h2>
//           <p>Basic account informatin</p>
//         </div>
//         <form className="login-form d-flex flex-column" onSubmit={handleSubmit}>
//           <div className="inp-holder">
//             <div className="inp-container">
//               <input
//                 className="inp-field"
//                 value={name}
//                 onChange={changeNameInput}
//                 type="text"
//                 placeholder="Name"
//                 id="name"
//               />
//               <FaExclamationTriangle id="error3" className="error-triangle" />
//             </div>

//             <div className="pass-container">
//               <input
//                 className="inp-field pass"
//                 value={pass}
//                 onChange={changePassInput}
//                 type={passType}
//                 placeholder="Password"
//                 id="password"
//               // name="password"
//               />
//               <span
//                 id="icon-pass-2"
//                 className="toggle"
//                 onClick={togglePassword}
//               >
//                 {show}
//               </span>
//               <FaExclamationTriangle id="error4" className="error-triangle" />
//             </div>

//             <div className="inp-container">
//               <input
//                 className="inp-field"
//                 value={emial}
//                 onChange={changeEmailInput}
//                 type="email"
//                 placeholder="Email"
//                 id="email"
//               />
//               <FaExclamationTriangle id="error5" className="error-triangle" />
//             </div>

//             <div className="pass-container">
//               <input
//                 className="inp-field pass"
//                 value={confPass}
//                 onChange={changeConfirmPassInput}
//                 type={passType2}
//                 placeholder="Confirm password"
//                 id="conf-password"
//               // name="conf-password"
//               />
//               <span
//                 id="icon-pass-3"
//                 className="toggle"
//                 onClick={togglePassword2}
//               >
//                 {show2}
//               </span>
//               <FaExclamationTriangle id="error6" className="error-triangle" />
//             </div>
//           </div>
//           <div className="signup-social-holder">
//             <button type="submit" onClick={checkAuth}>
//               <p className="btn rounded-pill my-3 reg">Sign Up</p>
//             </button>
//             <div className="signup-social d-flex">
//               <p>Or sign up with </p>
//               <div className="social-icons">
//                 <button className="soc-log-btn" onClick={github}>
//                   <FaLinkedinIn />
//                 </button>
//                 <button className="soc-log-btn" onClick={google}>
//                   <FaGoogle />
//                 </button>
//                 <button className="soc-log-btn" onClick={facebook}>
//                   <FaFacebookF />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>

//         <div className="switch-register">
//           <p>I accept privacy terms and conditions </p>
//           {/* <input type="checkbox" value={"Accept"} id="accept" name="accept" /> */}
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               value=""
//               id="accept"
//             ></input>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Resgister;

import "./style.css";
import { React, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../../features/user";
import { Localhost } from "../../config/api";
import { Success, Error } from "../../components/Toast";
import Logo from "../../components/logo";

const Resgister = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emial, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [confPass, setConfPass] = useState("");
  const [show, setShow] = useState("Show");
  const [passType, setPassType] = useState("password");
  const [show2, setShow2] = useState("Show");
  const [passType2, setPassType2] = useState("password");

  const handleSubmit = (e) => {
    let name = document.getElementById("name");
    let password = document.getElementById("password");
    let email = document.getElementById("email");
    let confirmPass = document.getElementById("conf-password");
    e.preventDefault();
    if (
      name.value !== "" &&
      email.value !== "" &&
      password.value !== "" &&
      confirmPass.value === password.value
    ) {
      const payload = { name: name.value, email: email.value };

      const postUser = async () => {
        dispatch(loginStart());
        try {
          const res = await axios.post(
            `${Localhost}/api/auth/signup`,
            {
              ...payload,
              password: password.value,
            },
            { withCredentials: true }
          );

          dispatch(loginSuccess(res.data));
          navigate("/login");
          Success('Registered succufully')
        } catch (err) {
          dispatch(loginFailure());
          Error('Registered failed')
        }
      };
      postUser();
    }
  };

  const togglePassword = () => {
    if (pass !== "" && show === "Show") {
      setShow("Hide");
      setPassType("text");
      //   console.log(show);
    } else if (show === "Hide") {
      setShow("Show");
      setPassType("password");
    }
  };

  const togglePassword2 = () => {
    if (confPass !== "" && show2 === "Show") {
      setShow2("Hide");
      setPassType2("text");
      //   console.log(show);
    } else if (show2 === "Hide") {
      setShow2("Show");
      setPassType2("password");
    }
  };

  // start check empty inputs
  const checkAuth = () => {
    let name = document.getElementById("name");
    let password = document.getElementById("password");
    let email = document.getElementById("email");
    let confirmPass = document.getElementById("conf-password");
    if (name.value === "") {
      name.style.border = "thin solid #e01b24";
      document.getElementById("error3").style.display = "block";
    }
    if (email.value === "") {
      email.style.border = "thin solid #e01b24";
      document.getElementById("error5").style.display = "block";
    }
    if (password.value === "") {
      password.style.border = "thin solid #e01b24";
      document.getElementById("icon-pass-2").style.display = "none";
      document.getElementById("error4").style.display = "block";
    }
    if (confirmPass.value === "") {
      confirmPass.style.border = "thin solid #e01b24";
      document.getElementById("icon-pass-3").style.display = "none";
      document.getElementById("error6").style.display = "block";
    } else {
      name.style.border = "none";
      email.style.border = "none";
      password.style.border = "none";
      confirmPass.style.border = "none";
      name.style.borderBottom = "thin solid #fed049";
      email.style.borderBottom = "thin solid #fed049";
      password.style.borderBottom = "thin solid #fed049";
      confirmPass.style.borderBottom = "thin solid #fed049";
    }
  };
  const changeNameInput = (e) => {
    setName(e.target.value);
    let name = document.getElementById("name");
    if (name.value !== "") {
      document.getElementById("error3").style.display = "none";
    }
  };
  const changeEmailInput = (e) => {
    setEmail(e.target.value);
    let email = document.getElementById("email");
    if (email.value !== "") {
      document.getElementById("error5").style.display = "none";
    }
  };
  const changePassInput = (e) => {
    setPass(e.target.value);
    let password = document.getElementById("password");

    if (password.value !== "") {
      document.getElementById("icon-pass-2").style.display = "block";
      document.getElementById("error4").style.display = "none";
    }
  };
  const changeConfirmPassInput = (e) => {
    setConfPass(e.target.value);
    let confirmPassword = document.getElementById("password");

    if (confirmPassword.value !== "") {
      document.getElementById("icon-pass-3").style.display = "block";
      document.getElementById("error6").style.display = "none";
    }
  };

  const google = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  const github = () => {
    window.open(`http://localhost:5000/auth/github/callback`, "_self");
  };

  const facebook = () => {
    window.open(`http://localhost:5000/auth/facebook/callback`, "_self");
  };

  return (
    <>
      <Logo />
      <div className="parent">
        <div className="auth-form-container">
          <div className="register-head">
            <h2>Create a new account</h2>
            <p>Basic account informatin</p>
          </div>
          <form className="login-form d-flex flex-column" onSubmit={handleSubmit}>
            <div className="inp-holder">
              <div className="inp-container">
                <input
                  className="inp-field"
                  value={name}
                  onChange={changeNameInput}
                  type="text"
                  placeholder="Name"
                  id="name"
                />
                <FaExclamationTriangle id="error3" className="error-triangle" />
              </div>

              <div className="pass-container">
                <input
                  className="inp-field pass"
                  value={pass}
                  onChange={changePassInput}
                  type={passType}
                  placeholder="Password"
                  id="password"
                // name="password"
                />
                <span
                  id="icon-pass-2"
                  className="toggle"
                  onClick={togglePassword}
                >
                  {show}
                </span>
                <FaExclamationTriangle id="error4" className="error-triangle" />
              </div>

              <div className="inp-container">
                <input
                  className="inp-field"
                  value={emial}
                  onChange={changeEmailInput}
                  type="email"
                  placeholder="Email"
                  id="email"
                />
                <FaExclamationTriangle id="error5" className="error-triangle" />
              </div>

              <div className="pass-container">
                <input
                  className="inp-field pass"
                  value={confPass}
                  onChange={changeConfirmPassInput}
                  type={passType2}
                  placeholder="Confirm password"
                  id="conf-password"
                // name="conf-password"
                />
                <span
                  id="icon-pass-3"
                  className="toggle"
                  onClick={togglePassword2}
                >
                  {show2}
                </span>
                <FaExclamationTriangle id="error6" className="error-triangle" />
              </div>
            </div>
            <div className="signup-social-holder">
              <button type="submit" onClick={checkAuth} className="signup">
                Sign Up
                {/* <p className="btn rounded-pill my-3 reg">Sign Up</p> */}
              </button>
              <div className="signup-social d-flex">
                <p>Or sign up with </p>
                <div className="social-icons">
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
              </div>
            </div>
          </form>

          <div className="switch-register">
            <p>I accept privacy terms and conditions </p>
            {/* <input type="checkbox" value={"Accept"} id="accept" name="accept" /> */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="accept"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Resgister;
