import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

import { removeuser } from "../Redux/userSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userD);

  const handlelogin = () => {
    navigate("/login");
  };
  const handleprofile = () => {
    navigate("/profile");
  };

  const homelogout = () => {
    dispatch(removeuser());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mainpage">
      <div className="nav">
        <h1>HomePage</h1>
        <div className="menus">
          {user.id ? (
            <>
              <div className="logout" onClick={handleprofile}>
                Profile
              </div>
              <div className="logou" onClick={homelogout}>
                Logout
              </div>
            </>
          ) : (
            <div className="logou" onClick={handlelogin}>
              Login
            </div>
          )}
        </div>
      </div>
      <div class="image-container">
        <img
          class="imghome"
          src="https://img.freepik.com/premium-photo/painting-mountain-lake-with-mountain-background_327072-11633.jpg?w=2000"
          alt=""
        />
        <div class="contenthome">
          <h1 className="homeitem">Wellcome {user.name}</h1>
        </div>
      </div>
    </div>
  );
}
