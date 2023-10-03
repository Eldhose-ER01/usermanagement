import { useForm } from "react-hook-form";
import axios from "axios";
import "./adduser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Adduser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    try {
      const data = {
        name: username,
        email,
        password,
        username,
        phone,
      };
      const response = await axios.post(
        "http://localhost:5000/admin/adduser",
        data
      );
      if (response.data.errorMessage) {
        setErr(response.data.errorMessage);
      }
      if (response.data.success) {
        navigate("/admin/userlist");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainPage">
      <div className="content">
        <h1>Signup Page</h1>
        <input
          {...register("username", { required: true })}
          type="text"
          id="username"
          name="username"
          placeholder="userName"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        {errors.username && (
          <span style={{ color: "red" }}>Please fill the username</span>
        )}
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {err && <span style={{ color: "red" }}>{err}</span>}
        {errors.email && (
          <span style={{ color: "red" }}>Please Provide Email</span>
        )}
        <input
          {...register("phone", { required: true })}
          type="text"
          id="phone"
          name="phone"
          placeholder="Mobile no"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        {errors.phone && (
          <span style={{ color: "red" }}>Enter the Phone Number</span>
        )}
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {errors.password && (
          <span style={{ color: "red" }}>Please fill Strong Password</span>
        )}
        <div className="login-btn" onClick={handleSubmit(handleRegister)}>
          Submit
        </div>
      </div>
    </div>
  );
}
