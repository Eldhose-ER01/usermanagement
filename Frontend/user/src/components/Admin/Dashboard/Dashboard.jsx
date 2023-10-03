import React from "react";
import "./dasboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/adminSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useSelector((store) => store.admin.admindata);
  const userlist = () => {
    navigate("/admin/userlist");
  };
  const logout = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <div className="dashboard">
      <div className="dashnav">
        <h1 className="adminnavcontent">Dashboard</h1>
        <div className="adminitems">
          <div className="userlist" onClick={userlist}>
            userlist
          </div>
          <div className="adminlogout" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
      <div>
        <img
          className="adminsdash"
          src="https://www.followeraudit.com/blog/wp-content/uploads/2023/02/Web-Developer-skill.jpg"
          alt=""
          srcset=""
        />
      </div>
    </div>
  );
}
