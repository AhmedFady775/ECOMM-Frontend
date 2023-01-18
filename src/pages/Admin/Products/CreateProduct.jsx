import React from "react";
import { useState, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Store } from "../../../components/Store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinearProgress from "@mui/joy/LinearProgress";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_REQUEST":
      return { ...state, loadingSubmit: true };
    case "SUBMIT_SUCCESS":
      return { ...state, loadingSubmit: false };
    case "SUBMIT_FAIL":
      return { ...state, loadingSubmit: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

function CreateProduct() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setcountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [choose, setChoose] = useState(false);

  const sumbitPost = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SUBMIT_REQUEST" });
      await axios.post(
        "http://localhost:5000/api/products/create",
        name,
        type,
        brand,
        category,
        price,
        countInStock,
        description,
        image,
        images
      );

      dispatch({
        type: "SUBMIT_SUCCESS",
      });
      toast.success("Post created successfully.");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "upload",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: "UPLOAD_SUCCESS" });
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success("Image uploaded successfully.");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    setImages(images.filter((x) => x !== fileName));
    setImage(image.filter((image) => image !== fileName));
    toast.success("Image removed successfully. click Update to apply it");
  };

  return (
    <div className="flex flex-col p-4 min-h-screen lg:w-[85vw]">
      <div className="flex flex-col cursor-pointer mb-4">
        <div
          onClick={() => setChoose(!choose)}
          className="flex flex-row items-end  mb-2"
        >
          <p className="text-3xl"> Products</p>
          <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
        </div>
        {choose ? (
          <div className="flex flex-col mb-4 w-fit text-lg ml-4 py-2 border shadow-lg rounded">
            <Link className="px-4 py-2 hover:bg-slate-200" to="/products">
              Manage Products
            </Link>
            <Link className="px-4 py-2 hover:bg-slate-200" to="/createproduct">
              Create Product
            </Link>
          </div>
        ) : null}
      </div>
      <form onSubmit={sumbitPost} encType="multipart/form-data">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label className="flex mt-4 mb-2">
                <strong>Product Name</strong>
              </label>
              <input
                autoFocus
                className="flex p-3 shadow rounded outline-teal-500"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label className="flex mt-8 mb-2">
                  <strong>Type</strong>
                </label>
                <input
                  className="flex p-3 shadow rounded outline-teal-500"
                  required
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="flex mt-8 mb-2">
                  <strong>Category</strong>
                </label>
                <input
                  className="flex p-3 shadow rounded outline-teal-500"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="flex mt-8 mb-2">
                  <strong>Brand</strong>
                </label>
                <input
                  className="flex p-3 shadow rounded outline-teal-500"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>price</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>countInStock</strong>
              </label>
              <input
                type="number"
                className="flex p-3 shadow rounded outline-teal-500"
                required
                onChange={(e) => setcountInStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Description</strong>
              </label>
              <textarea
                className="flex p-3 shadow rounded outline-teal-500 min-h-[280px] overflow-y-hidden resize-none"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col">
              <strong className="flex mt-8 mb-2">Product Image</strong>
              <div className="flex flex-col">
                <label
                  className="flex flex-row items-center text-white py-2 px-6 bg-teal-500 rounded w-fit mb-4"
                  htmlFor="Image"
                >
                  <div>
                    <img src="https://img.icons8.com/material-outlined/6b7280/FFFFFF/image.png" />
                  </div>
                  Add Image
                </label>
                <input
                  id="Image"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={uploadFileHandler}
                />
              </div>
              {image.length === 0 ? (
                <strong>No image</strong>
              ) : (
                <div className="flex h-64 w-64">
                  <img className="object-cover" src={image} alt="pic" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <strong className="flex mt-8 mb-2">Product Images</strong>
              <div className="flex flex-col">
                <label
                  className="flex flex-row items-center text-white py-2 px-6 bg-teal-500 rounded w-fit mb-4"
                  htmlFor="Images"
                >
                  <div>
                    <img src="https://img.icons8.com/material-outlined/6b7280/FFFFFF/image.png" />
                  </div>
                  Add Images
                </label>
                <input
                  id="Images"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={(e) => uploadFileHandler(e, true)}
                />
              </div>
              {loadingUpload && <LinearProgress />}
              {images.length === 0 && (
                <div className="flex flex-row w-full justify-center py-4">
                  <strong>No images</strong>
                </div>
              )}
              <div className="imagesWrappercont">
                <div className="imagesWrapper">
                  {images.map((x) => (
                    <div key={x}>
                      <div className="imageUploadPreview">
                        <img src={x} alt="pic" />
                      </div>
                      <div
                        className="delete"
                        onClick={() => deleteFileHandler(x)}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <button className="p-2 bg-teal-500 rounded w-full" type="submit">
                <p className="font-bold text-white">Add Product</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
