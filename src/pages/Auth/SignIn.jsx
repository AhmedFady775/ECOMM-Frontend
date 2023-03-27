import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useReducer } from "react";
import { toast } from "react-toastify";
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
  const redirect = redirectInUrl ? redirectInUrl : "/";

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
        "https://ecomm12.herokuapp.com/auth/login",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS" });
      navigate(redirect || "/");
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
    <div className="flex flex-col">
      <div className="flex h-[72px] items-center justify-center shadow">
        <Link to="/">
          <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
        </Link>
      </div>
      <div className="flex flex-col items-center lg:w-[378px] lg:max-w-[378px] px-4 lg:mx-auto">
        <div className="flex my-4 items-center">
          <img src={mobileLogin} className="w-[200px]" />
        </div>
        <p className="text-[#0e001a] mb-4 text-[1.3rem] font-semibold leading-[1.8rem] ">
          Welcome back!
        </p>
        <form onSubmit={submitHandler} className="flex flex-col w-full">
          <div className="flex flex-col mb-4">
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col ">
            {loading ? (
              <button
                className="bg-slate-300 text-white  p-4 rounded flex justify-center items-center "
                type="submit"
              >
                <CircularProgress size={25} thickness={4} color="inherit" />
              </button>
            ) : (
              <button
                className="bg-[#0e001a] text-white p-4 rounded-lg hover:bg-[#0e001ab7] transition"
                type="submit"
              >
                Sign In
              </button>
            )}
          </div>
          <div className="flex mt-4 text-sm font-normal leading-4 tracking-[0]">
            New customer?{" "}
            <Link
              className="text-sky-500 ml-2"
              to={`/signup?redirect=${redirect}`}
            >
              Create your account.
            </Link>
          </div>
        </form>
        <p className="text-xs font-normal leading-4 tracking-[0] text-center w-[300px] text-[#7f8286] mt-6">
          By continuing, you agree to our Privacy Policy and Terms of Use.
        </p>
      </div>
    </div>
  );
}
