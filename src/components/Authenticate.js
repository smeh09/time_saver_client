import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PopUpModal from "./popup/PopupModal";
import "./styles/authenticate.css";

export default function Authenticate({ token, setToken }) {
  const params = new URLSearchParams(useLocation().search);
  const type = params.get("type");

  // Redirect
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== "sign_in" && type !== "sign_up") {
      navigate("/");
    }
  }, [navigate, type]);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpSchool, setSignUpSchool] = useState("");
  const [signUpSection, setSignUpSection] = useState("");
  const [signUpClass, setSignUpClass] = useState("");

  const [popUpData, setPopUpData] = useState(null);

  const [isLoader, setIsLoader] = useState(false);

  const fetchUpdate = async (url, data) => {
    setIsLoader(true);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const result = await res.json();
    setIsLoader(false);
    console.log(result);
    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("profilePhotoURL", result.profilePhotoURL);
      setToken(result.token);
      return true;
    } else {
      setPopUpData({
        title: "Error",
        message: result.msg,
        onConfirm: () => {
          setPopUpData(null);
          setToken(false);
          localStorage.setItem("token", null);
          localStorage.setItem("profilePhotoURL", null);
        },
      });
      return false;
    }
  };

  const signIn = async () => {
    const result = await fetchUpdate(
      "https://time-saver-server.herokuapp.com/api/auth",
      {
        email: signInEmail,
        password: signInPassword,
      }
    );

    if (result) return navigate("/tables");

    return result;
  };

  const signUp = async () => {
    const result = await fetchUpdate(
      "https://time-saver-server.herokuapp.com/api/user",
      {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        school: signUpSchool,
        class: signUpClass,
        section: signUpSection,
      }
    );

    if (result) return navigate("/tables");

    return result;
  };

  const changeDirections = () => {
    type === "sign_in" ? signIn() : signUp();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeDirections();
  };

  if (isLoader) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {popUpData ? (
        <PopUpModal
          title={popUpData.title}
          message={popUpData.message}
          onConfirm={popUpData.onConfirm}
        />
      ) : (
        <></>
      )}
      <div id="authentication-modal-outer">
        <div id="authentication-modal-inner">
          <div id="authentication-heading-links">
            <div className="authentication-link-container">
              <Link
                className="authentication-link"
                id={type === "sign_in" ? "selected" : ""}
                to="/authenticate?type=sign_in"
              >
                Sign in
              </Link>
            </div>
            <div className="authentication-link-container">
              <Link
                className="authentication-link"
                id={type === "sign_up" ? "selected" : ""}
                to="/authenticate?type=sign_up"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="authentication-component">
            <form onSubmit={(e) => handleSubmit(e)}>
              {type === "sign_in" ? (
                <>
                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Email
                    </div>
                    <input
                      required
                      type="email"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your Email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Password
                    </div>
                    <input
                      required
                      type="password"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your Password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                    />
                  </div>

                  <div id="authenticate-submit-button-container">
                    <button type="submit" id="authenticate-submit-button">
                      Sign In!{" "}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Full Name
                    </div>
                    <input
                      required
                      type="text"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your Name"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Email
                    </div>
                    <input
                      required
                      type="email"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your Email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Password
                    </div>
                    <input
                      required
                      type="password"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your Password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      School
                    </div>
                    <input
                      required
                      type="text"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your school"
                      value={signUpSchool}
                      onChange={(e) => setSignUpSchool(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Grade
                    </div>
                    <input
                      required
                      type="text"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your class"
                      value={signUpClass}
                      onChange={(e) => setSignUpClass(e.target.value)}
                    />
                  </div>

                  <div className="authenticate-form-control">
                    <div className="authenticate-form-control-input-label">
                      Section
                    </div>
                    <input
                      required
                      type="text"
                      className="authenticate-form-control-input"
                      placeholder="Please enter your section"
                      value={signUpSection}
                      onChange={(e) => setSignUpSection(e.target.value)}
                    />
                  </div>

                  <div id="authenticate-submit-button-container">
                    <button type="submit" id="authenticate-submit-button">
                      Sign Up!{" "}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
