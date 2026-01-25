import { useState } from "react";
import { signUp } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ShowError from "../ShowError";
import { set } from "zod";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setUser: LoginUser } = useAuth();
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

  async function handleSignUpClick() {
    const isInputEmpty = checkInput(user);
    if (isInputEmpty) {
      setError("All fields are required!");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const response = await signUp(user);
      const token = response.token;
      localStorage.setItem("token", token);
      LoginUser(response.user);
      navigate("/");
    } catch (error) {
      if(error.code){
        setError(error.message);
      }else{
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
            {/* Start Organizing Now!" */}
            Start <p> Organizing</p> Now!
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
          <div>
            <div className="passwordInput-div">
              <div className="passwordInput-lableDiv">
                <label className="password-lable" htmlFor="password">
                  Password
                </label>
                <button
                  className="baseBtnClass"
                  onClick={() => setIsShowPass(prev => !prev)}
                >
                  {isShowPass ? "Hide": "See"}
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
          </div>
          <div className="loginBtn-div">
            <button className="loginBtn" onClick={handleSignUpClick}>
              {isProcessing ? "processing..." : "Sign in"}
            </button>
            <Link to="/login">Already have an Accout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
