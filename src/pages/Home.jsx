import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Hero from "../assets/Hero.jpg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import pic1 from "../assets/1.png";
import pic2 from "../assets/2.png";
import pic3 from "../assets/3.png";
import pic4 from "../assets/3.png";

const pics = [
  {
    pic: "https://btech.com/cdn-cgi/image/quality=50,format=auto/media/homecontent/banner/u/p/updated_webbb_en_1.png",
  },
  { pic: pic2 },
  { pic: pic3 },
  { pic: pic4 },
];

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-col min-h-screen lg:m-auto lg:w-max-[1184px] lg:w-[1184px]">
        <div className="mt-4">
          <Carousel
            autoPlay
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
          >
            {pics.map((item) => (
              <img className="h-[200px] lg:h-[400px]" src={item.pic} />
            ))}
          </Carousel>

          <Link to="/shop" className="justify-center flex flex-col">
            <button className="px-8 py-2 font-semibold text-black text-xl rounded shadow bg-white">
              SHOP NOW
            </button>
          </Link>
        </div>
        {/* <section className="flex flex-col">
          <div className="h-[50vh] w-full">
            <img className="h-full w-full object-cover" src={Hero} />
          </div>
          <div className="absolute text-white top-[35%] left-[50%] text-2xl lg:text-4xl translate-x-[-50%] translate-y-[-50%] w-[80%] lg:w-[60%] text-center font-semibold">
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
        </section> */}
        <p className="text-4xl font-semibold my-8 text-center">TOP TRENDING</p>
        {/* <div className="flex flex-row gap-2">
          {pics.map((item) => (
            <div className="w-full h-64">
              <img className="h-full w-full rounded" src={item.pic} />
            </div>
          ))}
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
