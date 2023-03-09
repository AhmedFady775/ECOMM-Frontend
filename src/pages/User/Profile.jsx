import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../../components/Store";
import CircularProgress from "@mui/material/CircularProgress";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      dispatch({
        type: "UPDATE_REQUEST",
      });
      const { data } = await axios.put(
        "https://ecomm12.herokuapp.com/users/edit",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(err);
    }
  };

  return (
    <div className="flex flex-col lg:items-center p-4 lg:p-0 min-h-screen">
      <p className="text-3xl font-semibold lg:my-10 mb-4">User Profile</p>
      <form onSubmit={submitHandler} className="lg:w-[600px]">
        <div className="inputCont" controlId="name">
          <label className="inputlabel">First name</label>
          <input
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="inputCont" controlId="name">
          <label className="inputlabel">Last name</label>
          <input
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="inputCont" controlId="name">
          <label className="inputlabel">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputCont" controlId="password">
          <label className="inputlabel">New Password</label>
          <input
            className="input"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputCont" controlId="password">
          <label className="inputlabel">Confirm Password</label>
          <input
            className="input"
            type="password"
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col py-4">
          {loadingUpdate ? (
            <button
              className="bg-slate-300 text-white py-2 px-6 rounded flex justify-center items-center"
              type="submit"
            >
              <CircularProgress size={25} thickness={4} color="inherit" />
            </button>
          ) : (
            <button
              className="bg-teal-500 text-white py-2 px-6 rounded"
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
