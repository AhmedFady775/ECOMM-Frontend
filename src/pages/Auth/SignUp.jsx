import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useReducer } from "react";
import Axios from "axios";
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

export default function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
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
        "https://ecomm12.herokuapp.com/auth/register",
        {
          firstName,
          lastName,
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
      toast.error("Password isn't correct");
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
        <p className="text-[#0e001a] mb-2 text-[1.3rem] font-semibold leading-[1.8rem] ">
          Let's get started!
        </p>
        <form onSubmit={submitHandler} className="flex flex-col w-full">
          <div className="flex flex-col mb-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-[48%]">
                <label className="inputlabel">First Name</label>
                <input
                  placeholder="First Name"
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="inputlabel">Last Name</label>
                <input
                  placeholder="Last Name"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="inputCont">
              <label className="inputlabel">E-mail</label>
              <input
                placeholder="E-mail"
                className="input"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputCont">
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
                Sign up
              </button>
            )}
          </div>
          <div className="flex mt-4 text-sm font-normal leading-4 tracking-[0]">
            Already have an account?
            <Link
              className="text-sky-500 ml-2"
              to={`/signin?redirect=${redirect}`}
            >
              Sign in.
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
