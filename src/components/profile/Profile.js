import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../popup/PopupModal";
import protectRoutes from "../../modules/protectRoutes";
import "./styles/profile.css";

const Profile = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userSection, setUserSection] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [deleteData, setDeleteData] = useState(null);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const isNotAuthenticated = protectRoutes();
    if (isNotAuthenticated) {
      navigate("/authenticate?type=sign_up");
      return;
    }
    const fetchData = async () => {
      const response = await fetch(
        `https://time-saver-server.herokuapp.com/api/user/`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const profileData = await response.json();
      if (profileData.success) {
        setName(profileData.data.name);
        setEmail(profileData.data.email);
        setProfileURL(profileData.data.profilePhoto);
        setUserSection(profileData.data.section);
        setUserClass(profileData.data.class);
        setUserSchool(profileData.data.school);
      } else {
        setName(false);
        setEmail(false);
        setProfileURL(false);
        setDeleteData({
          title: "Error",
          message: profileData.msg,
          onConfirm: () => {
            setDeleteData(null);
            setToken(false);
            localStorage.setItem("token", null);
            localStorage.setItem("profilePhotoURL", null);
            navigate("/");
          },
        });
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    setToken(false);
    localStorage.setItem("token", "null");
    localStorage.setItem("profilePhotoURL", "null");
    navigate("/");
  };

  const deleteAccount = async () => {
    setDeleteData({
      title: "Confirm",
      message: "Are you sure, you want to delete your account?",
      onConfirm: async () => {
        setDeleteData(null);
        const response = await fetch(
          `https://time-saver-server.herokuapp.com/api/user/`,
          {
            method: "DELETE",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          logOut();
        } else {
          setDeleteData({
            title: "Error",
            message: result.msg,
            onConfirm: () => {
              setDeleteData(null);
            },
          });
        }
      },
      onCancel: () => {
        setDeleteData(null);
      },
    });
  };

  if (!name && !email && !profileURL)
    return (
      <>
        {deleteData ? (
          <PopUpModal
            title={deleteData.title}
            message={deleteData.message}
            onConfirm={deleteData.onConfirm}
            onCancel={deleteData.onCancel}
          />
        ) : (
          <></>
        )}
        <div className="loader"></div>
      </>
    );

  return (
    <>
      {deleteData ? (
        <PopUpModal
          title={deleteData.title}
          message={deleteData.message}
          onConfirm={deleteData.onConfirm}
          onCancel={deleteData.onCancel}
        />
      ) : (
        <></>
      )}
      <div className="profile-outer">
        <div className="profile">
          <button
            className="update-btn-edit profile-edit-button"
            title="Edit profile"
            onClick={() => navigate("/account/profile/edit")}
          >
            Edit Profile
          </button>
          <img alt="pfp" src={profileURL} className="profile-img" />
          <div className="profile-data">
            <div className="details">
              <div className="data data-name">{name}</div>
              <div className="user-details-group">
                <div className="label">Email</div>
                <div className="data">{email}</div>

                <div className="label">School</div>
                <div className="data">{userSchool}</div>

                <div className="label">Class</div>
                <div className="data">{userClass}</div>

                <div className="label">Section</div>
                <div className="data">{userSection}</div>
              </div>
            </div>
            <div className="user-danger-stuff">
              <button
                onClick={logOut}
                className="user-log-out"
                title="Log out! "
              >
                Log out
              </button>
              <button
                onClick={deleteAccount}
                className="user-log-out"
                title="Delete account! "
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
