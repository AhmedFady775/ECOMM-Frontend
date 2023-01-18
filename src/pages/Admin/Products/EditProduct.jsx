import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../../components/Loading/Loading";
import { getError } from "../../../components/Utils/utils";
import { Store } from "../../../components/Store/Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "VIDEO_UPLOAD_REQUEST":
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

export default function EditProduct() {
  const { id } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [codeName, setCodeName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:5000/api/products/id/${id}`
        );
        setName(data.name);
        setCodeName(data.codeName);
        setCategory(data.category);
        setType(data.type);
        setBrand(data.brand);
        setDescription(data.description);
        setPrice(data.price);
        setCountInStock(data.countInStock);

        setImages(data.images);
        setVideos(data.videos);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}posts/update/${id}`,
        {
          name,
          codeName,
          description,
          category,
          brand,
          price,
          countInStock,
          type,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("post updated successfully");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  // const uploadFileHandler = async (e, forImages) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("file", file);
  //   try {
  //     const { data } = await axios.post(
  //       process.env.REACT_APP_BACKEND_URL + "upload",
  //       bodyFormData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );
  //     if (forImages) {
  //       setImages([...images, data.secure_url]);
  //     } else {
  //       setImage(data.secure_url);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const uploadFileHandler1 = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("file", file);
  //   try {
  //     dispatch({ type: "VIDEO_UPLOAD_REQUEST" });
  //     const { data } = await axios.post(
  //       process.env.REACT_APP_BACKEND_URL + "upload",
  //       bodyFormData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );
  //     dispatch({ type: "UPLOAD_SUCCESS" });
  //     setVideos([...videos, data.secure_url]);
  //     toast.success("video uploaded successfully.");
  //   } catch (err) {
  //     toast.error(getError(err));
  //     dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
  //   }
  // };

  // const deleteFileHandler = async (fileName, f) => {
  //   setImages(images.filter((x) => x !== fileName));
  //   toast.success("Image removed successfully.");
  // };

  // const deleteFileHandler1 = async (fileName, f) => {
  //   setVideos(videos.filter((x) => x !== fileName));
  //   toast.success("video removed successfully.");
  // };

  return (
    <div className="flex m-10">
      <div className="flex flex-col w-full">
        <div className="flex flex-col rounded p-8 bg-emerald-500 text-white mb-10">
          <p className="text-3xl font-bold mb-4 ">Product name: {name}</p>
          <p className="text-3xl font-bold">id: {id}</p>
        </div>

        {loading ? (
          <LinearProgress />
        ) : error ? (
          { error }
        ) : (
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Name</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Complain</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Complain</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Date</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Description</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Description</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Description</strong>
              </label>
              <input
                className="flex p-3 shadow rounded outline-teal-500"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex mt-8 mb-2">
                <strong>Description</strong>
              </label>
              <textarea
                className="flex p-3 shadow rounded outline-teal-500 min-h-[280px] overflow-y-hidden resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <div className="flex flex-col">
              <h3>Profile image:</h3>
              <div className="fileUpload">
                <label className="uploadbutton" htmlFor="image">
                  <UploadFileIcon fontSize="large" />
                  UPLOAD FILES
                </label>
                <input
                  style={{ display: "none" }}
                  id="image"
                  type="file"
                  multiple
                  onChange={uploadFileHandler}
                />
                {loadingUpload && <LinearProgress
 />}
              </div>
              {image.length === 0 ? (
                <strong>No image</strong>
              ) : (
                <div className="imageUploadPreview">
                  <img src={image} alt="pic" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h3>Images:</h3>
              <div className="fileUpload">
                <label className="uploadbutton" htmlFor="Images">
                  <UploadFileIcon fontSize="large" />
                  UPLOAD FILES
                </label>
                <input
                  id="Images"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={(e) => uploadFileHandler(e, true)}
                />
              </div>
              {loadingUpload && <LinearProgress
 />}
              {images.length === 0 && <strong>No image</strong>}
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

            <div className="flex flex-col">
              <h3>Videos:</h3>
              <div className="fileUpload">
                <label className="uploadbutton" htmlFor="Videos">
                  <UploadFileIcon fontSize="large" />
                  UPLOAD FILES
                </label>
                <input
                  id="Videos"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={(e) => uploadFileHandler1(e, true)}
                />
                {loadingUpload && <LinearProgress
 />}
              </div>
              {videos.length === 0 && <strong>No Videos</strong>}
              <div className="imagesWrappercont">
                <div className="imagesWrapper">
                  {videos.map((x) => (
                    <div key={x}>
                      <div className="videoUploadPreview">
                        <video src={x} controls alt="pic" />
                      </div>
                      <div
                        className="delete"
                        onClick={() => deleteFileHandler1(x)}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            <div className="formbutton">
              <button disabled={loadingUpdate} type="submit">
                Update
              </button>
              {loadingUpdate && <LinearProgress />}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
