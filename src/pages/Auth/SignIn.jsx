import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useReducer } from "react";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Store } from "../../components/Store";
import mobileLogin from "../../../src/assets/loginPic-01.png";
import CircularProgress from "@mui/material/CircularProgress";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false };
    case "LOGIN_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/shop";

  const [passwordShown, setPasswordShown] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_REQUEST" });

      const { data } = await Axios.post(
        "https://ecomm-i8yz.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS" });
      navigate(redirect || "/shop");
      toast.success("Logged in");
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
      toast.error("Wrong E-Mail or Password");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-row items-center md:space-x-32 w-full justify-center">
        <div className="md:flex hidden flex-col items-center">
          <img src={mobileLogin} className="w-[500px]" />
        </div>

        <form onSubmit={submitHandler} className="w-[70%] md:w-[30%]">
          <p className="text-5xl font-bold text-gray-400 mb-10">SIGN IN</p>
          <div className="flex flex-col mb-12">
            <label className="inputlabel">E-mail</label>
            <div className="inputCont">
              <input
                placeholder="E-mail"
                className="input"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputCont justify-between">
              <label className="inputlabel">Password</label>
              <input
                className="input"
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            {loading ? (
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
                Sign In
              </button>
            )}
          </div>
          <div className="flex mt-10">
            New customer?{" "}
            <Link
              className="text-sky-500 ml-2"
              to={`/signup?redirect=${redirect}`}
            >
              Create your account.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
