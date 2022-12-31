import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { Store } from "../../components/Store";

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
      const { data } = await axios.put(
        "/api/users/profile",
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
    <div className="flex flex-col p-4 min-h-screen">
      <strong className="text-lg mt-2 mb-4">User Profile</strong>
      <form onSubmit={submitHandler}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputCont" controlId="password">
          <label className="inputlabel">Confirm Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col py-4">
          <button
            className="flex flex-row justify-center px-4 py-2 text-white bg-teal-500 rounded"
            type="submit"
          >
            Update
          </button>
          {loadingUpdate && <Loading></Loading>}
        </div>
      </form>
    </div>
  );
}
