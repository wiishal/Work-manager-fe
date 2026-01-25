import { useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ShowError from "../ShowError";
import { set } from "zod";

export default function Login({ setLogged, setUserName }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setUser: setLogin } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const navigate = useNavigate();

  function setUserDetails(e, field) {
    setUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  async function handleLoginClick() {
    const isInputEmpty = checkInput(user);
    if (isInputEmpty) {
      setError("All fields are required!");
      return;
    }

    setIsProcessing(true);
    setError(null);
    let response;
    try {
      response = await login(user);
      const token = response.token;
      localStorage.setItem("token", token);
      setLogin(response.user);
      navigate("/");
    } catch (error) {
      if (error.isAppError) {
        setError(error.message);
      } else {
        setError("Internal Server Error!");
      }
    } finally {
      setIsProcessing(false);
    }
  }
  function checkInput(data) {
    const isEmpty = Object.values(data).some((detail) => detail === "");
    return isEmpty;
  }

  return (
    <div class="login-main">
      <div className="login-logo">
        <p onClick={() => navigate("/")} className="login-name">
          TODO
        </p>
      </div>
      <div className="login-bmain">
        <div className="login-tagline">
          <p className="login-tagLineText">
            Empower your <p> productivity</p>
          </p>
        </div>

        <div className="login-div">
          {error && <ShowError error={error} closeErrorPopUp={setError} />}
          <div className="userInput-div">
            <label className="username-lable" htmlFor="username">
              User Name
            </label>
            <input
              onChange={(e) => {
                setUserDetails(e, "username");
              }}
              className="username-input"
              type="text"
            />
          </div>

          <div className="passwordInput-div">
            <div className="passwordInput-lableDiv">
              <label className="password-lable" htmlFor="password">
                Password
              </label>
              <button
                className="baseBtnClass"
                onClick={() => setIsShowPass((prev) => !prev)}
              >
                {isShowPass ? "Hide" : "See"}
              </button>
            </div>
            <input
              onChange={(e) => {
                setUserDetails(e, "password");
              }}
              className="password-input"
              type={isShowPass ? "text" : "password"}
            />
          </div>

          <div className="loginBtn-div">
            <button className="loginBtn" onClick={handleLoginClick}>
              {isProcessing ? "processing..." : "log in"}
            </button>
            <Link to="/signup">Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
