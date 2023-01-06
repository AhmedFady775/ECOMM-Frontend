import { Link } from "react-router-dom";
import PIC from "../assets/PIC.jpg";
import pic1 from "../assets/1.png";
import pic2 from "../assets/2.png";
import pic3 from "../assets/3.png";
import pic4 from "../assets/4.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { useState } from "react";
import Loading from "../components/Loading/Loading";
import ProductsCard from "./Product/ProductCard";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Roadmap from "../components/MileStone";

const milestones = [
  {
    name: "walking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec blandit leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus arcu nulla, tristique eu dolor sed, iaculis laoreet velit. Fusce malesuada tincidunt consequat. Praesent placerat, magna sed mattis aliquam, orci massa posuere lectus, eu aliquam neque arcu at ante. Nunc in lorem dapibus, iaculis turpis eget, scelerisque lorem. Nam aliquet dolor non lorem auctor faucibus. Suspendisse euismod elit non purus posuere auctor. Nam ligula risus, varius sit amet sapien et, vehicula pulvinar neque. Vivamus ac felis erat. Vivamus tempor imperdiet mi eget egestas. Quisque faucibus sagittis orci. Phasellus mollis et elit sit amet aliquet. Quisque id dui cursus, efficitur odio a, mattis enim. Maecenas nec elit sem.",
  },
  {
    name: "riding",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec blandit leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus arcu nulla, tristique eu dolor sed, iaculis laoreet velit. Fusce malesuada tincidunt consequat. Praesent placerat, magna sed mattis aliquam, orci massa posuere lectus, eu aliquam neque arcu at ante. Nunc in lorem dapibus, iaculis turpis eget, scelerisque lorem. Nam aliquet dolor non lorem auctor faucibus. Suspendisse euismod elit non purus posuere auctor. Nam ligula risus, varius sit amet sapien et, vehicula pulvinar neque. Vivamus ac felis erat. Vivamus tempor imperdiet mi eget egestas. Quisque faucibus sagittis orci. Phasellus mollis et elit sit amet aliquet. Quisque id dui cursus, efficitur odio a, mattis enim. Maecenas nec elit sem.",
  },

  {
    name: "flying",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec blandit leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus arcu nulla, tristique eu dolor sed, iaculis laoreet velit. Fusce malesuada tincidunt consequat. Praesent placerat, magna sed mattis aliquam, orci massa posuere lectus, eu aliquam neque arcu at ante. Nunc in lorem dapibus, iaculis turpis eget, scelerisque lorem. Nam aliquet dolor non lorem auctor faucibus. Suspendisse euismod elit non purus posuere auctor. Nam ligula risus, varius sit amet sapien et, vehicula pulvinar neque. Vivamus ac felis erat. Vivamus tempor imperdiet mi eget egestas. Quisque faucibus sagittis orci. Phasellus mollis et elit sit amet aliquet. Quisque id dui cursus, efficitur odio a, mattis enim. Maecenas nec elit sem.",
  },
  {
    name: "hiking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec blandit leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus arcu nulla, tristique eu dolor sed, iaculis laoreet velit. Fusce malesuada tincidunt consequat. Praesent placerat, magna sed mattis aliquam, orci massa posuere lectus, eu aliquam neque arcu at ante. Nunc in lorem dapibus, iaculis turpis eget, scelerisque lorem. Nam aliquet dolor non lorem auctor faucibus. Suspendisse euismod elit non purus posuere auctor. Nam ligula risus, varius sit amet sapien et, vehicula pulvinar neque. Vivamus ac felis erat. Vivamus tempor imperdiet mi eget egestas. Quisque faucibus sagittis orci. Phasellus mollis et elit sit amet aliquet. Quisque id dui cursus, efficitur odio a, mattis enim. Maecenas nec elit sem.",
  },
  {
    name: "playing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec blandit leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus arcu nulla, tristique eu dolor sed, iaculis laoreet velit. Fusce malesuada tincidunt consequat. Praesent placerat, magna sed mattis aliquam, orci massa posuere lectus, eu aliquam neque arcu at ante. Nunc in lorem dapibus, iaculis turpis eget, scelerisque lorem. Nam aliquet dolor non lorem auctor faucibus. Suspendisse euismod elit non purus posuere auctor. Nam ligula risus, varius sit amet sapien et, vehicula pulvinar neque. Vivamus ac felis erat. Vivamus tempor imperdiet mi eget egestas. Quisque faucibus sagittis orci. Phasellus mollis et elit sit amet aliquet. Quisque id dui cursus, efficitur odio a, mattis enim. Maecenas nec elit sem.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="md:flex md:items-center md:justify-center">
        <div className="flex flex-col ">
          <div className="flex justify-center font-bold text-3xl py-10 lg:20">
            Landing page
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
