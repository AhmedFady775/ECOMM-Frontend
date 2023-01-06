import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Store } from "../../components/Store";
import mobileLogin from "../../../src/assets/loginPic-01.png";

export default function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/shop";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(
        "https://ecomm-i8yz.onrender.com/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/shop");
    } catch (error) {
      toast.error("Password isn't correct");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-row items-center space-x-32 w-full justify-center">
        <form onSubmit={submitHandler} className="w-[70%] md:w-[30%]">
          <p className="text-5xl font-bold text-gray-400 mb-10">SIGN UP</p>
          <div className="flex flex-col mb-12">
            <div className="inputCont">
              <label className="inputlabel">First Name</label>
              <input
                placeholder="First Name"
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="inputCont">
              <label className="inputlabel">Last Name</label>
              <input
                placeholder="Last Name"
                className="input"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
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
            <div className="inputCont">
              <label className="inputlabel">Confirm Password</label>
              <input
                className="input"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-teal-500 text-white py-2 px-6 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex mt-10">
            Already have an account?
            <Link
              className="text-sky-500 ml-2"
              to={`/signin?redirect=${redirect}`}
            >
              Sign In.
            </Link>
          </div>
        </form>
        <div className="md:flex hidden flex-col items-center">
          <img src={mobileLogin} className="w-[500px]" />
        </div>
      </div>
    </div>
  );
}
