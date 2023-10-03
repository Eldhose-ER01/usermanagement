import React, { useEffect, useState } from "react";
import "./userlist.css"; // Import your CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Userlist() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");

  const finduser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/uerlists?search=${search}`
      );
      console.log(response.data);
      if (response.data.success) {
        setUser(response.data.userdetails);
      } else {
        alert("somthing wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    finduser();
  }, [search]);

  const blockORunblock = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/admin/block?id=${id}`
    );

    if (response.data.success) {
      setUser(response.data.userdata);
    }
  };
  const deleteuser = async (id) => {
    const response = await axios.post(
      `http://localhost:5000/admin/delete?id=${id}`
    );
    const updatedUsers = user.filter((user) => user._id !== id);
    if (response.data.success) setUser(response.data.deletedata);
    setUser(updatedUsers)
  };
  const backuser = () => {
    navigate("/admin/dashboard");
  };

  const adminadduser = () => {
    navigate("/admin/adduser");
  };
  return (
    <div>
      <div className="dashnav">
        <h1 className="adminnavcontent">Userlist</h1>
        <input
          className="search"
          type="text"
          name="search"
          placeholder="Search.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="adminitems">
          <div className="userlist" onClick={adminadduser}>
            Adduser
          </div>
          <div className="adminlogout" onClick={backuser}>
            Back
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.length >= 0 &&
              user.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.status ? (
                        <button
                          className="block-btn"
                          onClick={() => {
                            blockORunblock(user._id);
                          }}
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          className="unblock-btn"
                          onClick={() => {
                            blockORunblock(user._id);
                          }}
                        >
                          Unblock
                        </button>
                      )}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          deleteuser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
