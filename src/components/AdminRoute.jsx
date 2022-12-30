import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? (
    children
  ) : (
    <div className="flex text-4xl font-meduim min-h-screen justify-center items-center">
      Access Denied
    </div>
  );
}
