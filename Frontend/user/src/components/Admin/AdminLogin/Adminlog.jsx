import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adminlogin } from "../../Redux/adminSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Adminlogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perr, setPErr] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogin = async (e) => {
    try {
      const admin = {
        email,
        password,
      };
      const response = await axios.post("http://localhost:5000/admin/login", {
        admin,
      });

      if (response.data.success) {
        dispatch(
          adminlogin({
            email: response.data.userData.email,
            token: response.data.userData.token,
          })
        );
        localStorage.setItem("token", response.data.userData.token);
        navigate("/admin/dashboard");
      }

      if (response.data.notExistuser) {
        setErr(response.data.notExistuser);
      }
      if (response.data.incorrectPassword) {
        setPErr(response.data.incorrectPassword);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="adminlogin">
      <div className="admincover">
        <h1>Admin Login</h1>
        <input
          {...register("email", { required: true })}
          type="eamil"
          name="email"
          id="email"
          placeholder="Enter your Username Or Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {err && <span style={{ color: "red" }}>{err}</span>}
        {errors.email && (
          <span style={{ color: "red" }}>Plese fill the username</span>
        )}

        <input
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {perr && <span style={{ color: "red" }}>{perr}</span>}
        {errors.password && (
          <span style={{ color: "red" }}>Plese fill the password</span>
        )}
        <div className="logbutton" onClick={handleSubmit(handlelogin)}>
          Login
        </div>
      </div>
    </div>
  );
}
