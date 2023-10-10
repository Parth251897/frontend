import React, { useState, useEffect } from "react";
import "./common.css";
import axios from "axios";

const Register = () => {
  const [userdetail, setuserdetails] = useState([]);
  const [userdetailadd, setuserdetailsadd] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setuserdetailsadd((val) => ({ ...val, [name]: value }));
  };

  async function getalluserdetails() {
    try {
      const result = await axios.get(
        "http://127.0.0.1:5000/user/userdetailall"
      );

      setuserdetails(result.data.userfind);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getalluserdetails();
  }, []);

  async function SubmitData() {
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/user/register",
        userdetailadd
      );
      setuserdetailsadd(result.data.Register);
      await getalluserdetails();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Created</th>
        </tr>
        {userdetail?.map((value) => {
          return (
            <>
              <tr>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>{value.role}</td>
                <td>{value.created}</td>
              </tr>
            </>
          );
        })}
      </table>
      <br />
      <div className="form">
        <div>
          <h1>User Registration</h1>
        </div>
        <form>
          <label className="label">Name</label>
          <br />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={userdetailadd.name}
            className="input"
          />
          <br />
          <label className="label">Email</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={userdetailadd.email}
            className="input"
          />
          <br />
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userdetailadd.password}
            className="input"
          />
          <br />
          <label className="label">Phone</label>
          <br />
          <input
            type="number"
            name="phone"
            onChange={handleChange}
            value={userdetailadd.number}
            className="input"
          />
          <br />
          <label className="label">Role</label>
          <br />
          <input
            type="text"
            name="role"
            onChange={handleChange}
            value={userdetailadd.role}
            className="input"
          />
          <br />
          <br />
          <button onClick={() => SubmitData()} className="btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
