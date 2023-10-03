import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const userid = useSelector((store) => store.user);
  const token = localStorage.getItem("token");
  console.log(token, "token localstorage");
  const headers = { authorization: token };
  console.log(userid, "-----------");
  const [user, setUser] = useState("");
  const [image, setImage] = useState(
    "https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"
  );
  const [switch1, setSwitch1] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const imageRef = useRef();
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const finduser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/profile?id=${token}`
      );
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
   
    const file = imageRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vajbc9es");

    try {
      let data;
      if (file) {
        let response = await axios.post(
          "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
          formData
        );

        data = {
       
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          image: response.data.url, 
        };
      } else {
        data = {
      
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          
        };
      }

      const updateResponse = await axios.post(
        "http://localhost:5000/updateProfile",
        data,
        { headers }
      );

      if (updateResponse.status === 200) {
        setSwitch1(true);
      }
      console.log(updateResponse);
    } catch (error) {
      console.error("Axios Error:", error);

      console.error(
        "Response Data:",
        error.response ? error.response.data : null
      );
    }
  };

  useEffect(() => {
    finduser();
  }, [switch1]);
  return (
    <>
      <div>
        <Toaster />
        <div className="navbar">
          <div className="navcontent">
            <h1 className="h1head">Profile</h1>
          </div>
          <h2
            onClick={() => {
              navigate("/");
            }}
          >
            Back To Home
          </h2>
        </div>
        <div className="main">
          {switch1 ? (
            <div className="card">
              <div className="picture">
                <div
                  className="profile"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: "150px",
                      height: "150px",
                      borderRadius:"50%",
                    }}
                    className="proimg"
                    src={
                      user.image
                        ? `${user.image}?${user.image}`
                        : `${image}?${image}`
                    }
                    alt="user img"
                  />
                </div>
              </div>

              <div className="details">
                <ul>
                  <h3>UserName:{user.name}</h3>
                  <h3>Email:{user.email}</h3>
                  <h3>phone:{user.phone}</h3>
                </ul>
              </div>
              <div
                className="edit"
                onClick={() => {
                  setSwitch1(false);
                }}
              >
                Edit
              </div>
            </div>
          ) : (
            <div>
              <div className="editpage">
                <div className="editcontent">
                  <div className="coverpage">
                    <h1>Edit Profile</h1>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      placeholder="name"
                      ref={nameRef}
                    />
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      placeholder="email"
                      ref={emailRef}
                    />
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user.phone}
                      placeholder="phone"
                      ref={phoneRef}
                    />
                    <input type="file" ref={imageRef} />
                    <div className="btnn">
                      <div
                        className="backbt"
                        onClick={() => {
                          setSwitch1(true);
                        }}
                      >
                        Back
                      </div>
                      <div className="submitbt" onClick={handlesubmit}>
                        Submit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
