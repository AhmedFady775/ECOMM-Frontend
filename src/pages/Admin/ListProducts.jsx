import axios from "axios";
import React, { useEffect, useReducer, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../components/Store";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, post: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ListProducts() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, post, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const deleteHandler = async (post) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}posts/delete/${post._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("post deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(error);
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "https://ecomm-i8yz.onrender.com1/products/",
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full p-10">
      <p className="flex text-4xl font-bold">Products Management</p>

      {/* <div className="flex flex-col w-[15%]">
        <label className="flex mt-8 mb-2">
          <strong>Choose a category:</strong>
        </label>
        <select
          onChange={(event) => {
            console.log(event.target.value);
            setType(event.target.value);
          }}
          value={type}
          className="flex p-2 shadow  outline-teal-500"
        >
          {typeOflist.map((x) => (
            <option value={x}>{x}</option>
          ))}
        </select>
      </div> */}

      {loading ? (
        <Loading />
      ) : error ? (
        { error }
      ) : (
        <div className="flex mt-10 ">
          <table className="bg-slate-800 w-full">
            <thead className="text-white text-center ">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">NAME</th>
                <th className="p-2">PRICE</th>
                <th className="p-2">CATEGORY</th>
                <th className="p-2">BRAND</th>
                <th className="p-2">Management</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {post.map((post) => (
                <tr key={post._id}>
                  <td className="p-2">{post._id}</td>
                  <td className="p-2">{post.name}</td>
                  <td className="p-2">{post.price}</td>
                  <td className="p-2">{post.category}</td>
                  <td className="p-2">{post.brand}</td>
                  <td className="p-2">
                    <button
                      className="py-2 px-4 text-sm rounded bg-slate-800"
                      onClick={deleteHandler}
                    >
                      <div>
                        <img src="https://img.icons8.com/ios-glyphs/20/FFFFFF/delete.png" />
                      </div>
                    </button>
                    &nbsp;
                    <button
                      className="py-2 px-4 text-sm rounded bg-slate-800"
                      onClick={() => navigate(`/editposts/${post._id}`)}
                    >
                      <div>
                        <img src="https://img.icons8.com/ios-glyphs/20/FFFFFF/pencil.png" />
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
