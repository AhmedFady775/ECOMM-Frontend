import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Store } from "../../components/Store";

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
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        "https://ecomm-i8yz.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast("Logged in");
      navigate(redirect || "/shop");
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex items-center h-screen flex-col justify-between py-36 bg-white">
      <div className="flex flex-col items-center">
        {/* <Link to="/" className="bg-slate-900">
          <img src={V2S} width={"180px"} />
        </Link> */}
        <strong className="text-6xl text-teal-500">Sign In</strong>
      </div>

      <form onSubmit={submitHandler} className="w-[80%] lg:w-[25%]">
        <div className="flex flex-col mb-12">
          <div className="flex flex-col p-2 border-b-2  border-slate-600 mb-8">
            <input
              placeholder="E-mail"
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row p-2 border-b-2 border-slate-600 justify-between">
            <input
              className="bg-transparent focus:outline-none focus:placeholder:text-transparent"
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              <div className="showPass">
                <span
                  className="showPassButton"
                  onClick={() => setPasswordShown(!passwordShown)}
                >
                  {passwordShown ? (
                    <VisibilityOffIcon></VisibilityOffIcon>
                  ) : (
                    <VisibilityIcon></VisibilityIcon>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-teal-500 text-white py-2 px-6 rounded"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="flex">
        New customer?{" "}
        <Link className="text-sky-500 ml-2" to={`/signup?redirect=${redirect}`}>
          Create your account.
        </Link>
      </div>
    </div>
  );
}
