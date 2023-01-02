import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { Store } from "../../components/Store";

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

export default function ManageProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, post, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    axios.get("http://localhost:5000/api/types").then((response) => {
      setProductType(response.data);
    });
  }, []);

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

  const resitFilters = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get("http://localhost:5000/api/products/");
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }
  };

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
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full p-10">
      <p className="flex text-4xl font-bold">Products Management</p>
      {loadingDelete && <Loading />}
      {loading ? (
        <Loading />
      ) : error ? (
        { error }
      ) : (
        <div className="flex mt-10 flex-col w-full">
          <form>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="flex mt-8 mb-2">
                  <strong>Search by name</strong>
                </label>
                <input className="flex p-2 shadow  outline-teal-500" />
              </div>
              <div className="flex flex-col w-[15%]">
                <label className="flex mt-8 mb-2">
                  <strong>Choose a type:</strong>
                </label>
              </div>
              <div className="flex flex-col w-[15%]">
                <label className="flex mt-8 mb-2">
                  <strong>Choose a category:</strong>
                </label>
              </div>
              <div className="flex flex-col w-[15%]">
                <label className="flex mt-8 mb-2">
                  <strong>Choose a brand:</strong>
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                className="p-1 bg-teal-500 rounded my-2 text-white"
                type="submit"
              >
                searchForItem
              </button>
            </div>
          </form>
          <button
            className="p-1 bg-teal-500 rounded my-2 text-white"
            onClick={resitFilters}
          >
            resitFilters
          </button>
          <div>
            <div className="flex flex-col w-full">
              <label className="flex mt-8 mb-2">
                <strong>Choose your item</strong>
              </label>
              {post ? (
                <div>
                  {post.map((x) => (
                    <p>{x._id}</p>
                  ))}
                </div>
              ) : (
                <p>there is no such Product</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
