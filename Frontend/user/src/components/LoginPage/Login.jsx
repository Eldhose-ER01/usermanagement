import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [perr, setPErr] = useState("");
  const [block, setBlock] = useState("");

  const handleSubmitt = async (e) => {
    try {
      const user = {
        email,
        password,
      };
      const response = await axios.post("http://localhost:5000/login", {
        user,
      });
      if (response.data.success) {
        dispatch(
          addUser({
            id: response.data.userdata.id,
            name: response.data.userdata.name,
            token: response.data.userdata.token,
          })
        );
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.userdata.token);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
      if (response.data.notExistuser) {
        setErr(response.data.notExistuser);
      }
      if (response.data.incorrectPassword) {
        setPErr(response.data.incorrectPassword);
      }
      if (response.data.Block) {
        setBlock(response.data.Block);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main_page">
      <div className="cover">
        <h1>Login</h1>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="userName"
        />
        {err && <span style={{ color: "red" }}>{err}</span>}

        {errors.email && (
          <span style={{ color: "red" }}>Plese fill the username</span>
        )}
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        {perr && <span style={{ color: "red" }}>{perr}</span>}
        {block && <span style={{ color: "red" }}>{block}</span>}
        {errors.password && (
          <span style={{ color: "red" }}>Plese fill the password</span>
        )}
        <div className="button">
          <div className="login-btn" onClick={handleSubmit(handleSubmitt)}>
            Login
          </div>
          <div className="login-btn" onClick={() => navigate("/signup")}>
            Signup
          </div>
        </div>
        <p className="text">or login using</p>
        <div className="alt-login">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </div>
    </div>
  );
}
