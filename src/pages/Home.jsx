import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Hero from "../assets/Hero.jpg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col min-h-screen ">
        <section className="flex flex-col">
          <div className="h-[50vh] w-full">
            <img className="h-full w-full object-cover" src={Hero} />
          </div>
          <div className="absolute text-white top-[35%] left-[50%] text-4xl translate-x-[-50%] translate-y-[-50%] w-[60%] text-center font-semibold">
            <p className="">
              Welcome to our shopping market where you can shop diverse kinds of
              electronics.
            </p>
            <KeyboardDoubleArrowDownIcon
              sx={{ fontSize: 30 }}
              className="knowMoreAboutMeArrow mt-4"
            />
            <div className="flex justify-center mt-8">
              <Link to="/shop">
                <button className="px-8 py-2 font-semibold text-black text-xl rounded shadow bg-white">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
