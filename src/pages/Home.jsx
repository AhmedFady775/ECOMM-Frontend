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
import Navbar1 from "../components/navbar1";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Navbar1 />
      <div className="md:flex md:items-center md:justify-center">
        <div className="flex flex-col ">
          <section className="flex flex-col">
            <div className="hidden lg:flex">
              <Carousel
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
              >
                <div>
                  <img src={pic1} />
                </div>
                <div>
                  <img src={pic2} />
                </div>
                <div>
                  <img src={pic3} />
                </div>
              </Carousel>
            </div>
          </section>

          <div className="flex justify-center font-bold text-3xl py-10 lg:20">
            FEATURED PRODUCTS
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
