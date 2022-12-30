import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Store } from "../../components/Store";

export default function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/shop";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");

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
          name,
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/shop");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex items-center h-screen flex-col justify-between py-24 bg-white">
      <strong className="text-6xl text-teal-500">Sign Up</strong>
      <form onSubmit={submitHandler} className="w-[80%]">
        <div className="flex flex-col mb-12">
          <div className="flex flex-col p-2 border-b-2  border-slate-600 mb-8">
            <input
              placeholder="First name"
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col p-2 border-b-2  border-slate-600 mb-8">
            <input
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-row justify-between p-2 border-b-2  border-slate-600 mb-8">
            <input
              placeholder="Password"
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              type={passwordShown ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setPasswordShown(!passwordShown)}>
              {passwordShown ? (
                <VisibilityOffIcon></VisibilityOffIcon>
              ) : (
                <VisibilityIcon></VisibilityIcon>
              )}
            </span>
          </div>
          <div className="flex flex-col p-2 border-b-2  border-slate-600">
            <input
              placeholder="Confirm Password"
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              type={passwordShown ? "text" : "password"}
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
      </form>
      <div className="flex">
        Already have an account?
        <Link className="text-sky-500 ml-2" to={`/signin?redirect=${redirect}`}>
          Sign In.
        </Link>
      </div>
    </div>
  );
}
