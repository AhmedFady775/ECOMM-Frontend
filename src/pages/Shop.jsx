import { useState } from "react";
import ProductsCardGrid from "./Product/ProductCardGrid";
import ProductsCardFlex from "./Product/ProductCardFlex";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveIcon from "@mui/icons-material/Remove";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import TuneIcon from "@mui/icons-material/Tune";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { CiSliderHorizontal } from "react-icons/ci";
import { BsSortAlphaDown } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { FaGripLines } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Shop = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["repoData", { page }],
    queryFn: () =>
      axios
        .get(`https://ecomm12.herokuapp.com/products?page=${page}`)
        .then((res) => res.data),
  });

  const { data: allProducts } = useQuery({
    queryKey: ["allData"],
    queryFn: () =>
      axios
        .get("https://ecomm12.herokuapp.com/products/allproducts")
        .then((res) => res.data),
  });

  const breadcrumbs = [
    <Link key="1" color="inherit" to="/">
      Home
    </Link>,
    <strong key="2" color="text.primary">
      Cameras
    </strong>,
  ];

  const [openCategory, setOpenCategory] = useState(true);
  const handleopenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const [openPrice, setOpenPrice] = useState(true);
  const handlopenPrice = () => {
    setOpenPrice(!openPrice);
  };

  const [grid, setgrid] = useState(true);
  const handleGrid = () => {
    setgrid(!grid);
  };

  const SKELETON = (
    <div className="flex flex-col px-6 py-5 gap-2">
      <Skeleton height={150} variant="rectangle" />
      <Skeleton
        height={10}
        width={100}
        sx={{ borderRadius: "4px" }}
        variant="rectangle"
      />
      <Skeleton
        height={10}
        width={50}
        sx={{ borderRadius: "4px" }}
        variant="rectangle"
      />
    </div>
  );

  const CATEGORY = () => (
    <FormGroup className="my-4">
      <FormControlLabel control={<Checkbox />} label="Label" />
      <FormControlLabel control={<Checkbox />} label="Label" />
    </FormGroup>
  );

  const PRICE = () => (
    <FormGroup className="my-4">
      <FormControlLabel control={<Checkbox />} label="Label" />
      <FormControlLabel control={<Checkbox />} label="Label" />
    </FormGroup>
  );

  const filtermob = () => (
    <ul className="flex text-xs h-10 items-center font-semibold flex-row border-b border-gray-200">
      <li className="flex h-full justify-center items-center w-[40%] border-r border-gray-200">
        <CiSliderHorizontal size={15} className="mr-2" /> Filter by
      </li>
      <li className="flex h-full justify-center items-center w-[40%] border-r border-gray-200">
        <BsSortAlphaDown size={15} className="mr-2" />
        Sort
      </li>
      <li
        onClick={handleGrid}
        className="flex h-full justify-center items-center w-[20%]"
      >
        {grid ? <RxHamburgerMenu size={15} /> : <RxDashboard size={15} />}
      </li>
    </ul>
  );

  const filter = () => (
    <ul className="flex flex-col text-black mr-6">
      <li className="flex flex-col py-4 cursor-pointer">
        <div
          onClick={handleopenCategory}
          className="flex flex-row justify-between w-full"
        >
          Brand
          {openCategory ? (
            <RemoveIcon sx={{ fontSize: 20 }} />
          ) : (
            <AddIcon sx={{ fontSize: 20 }} />
          )}
        </div>

        {openCategory ? CATEGORY() : null}
      </li>

      <li className="flex flex-col py-4 cursor-pointer">
        <div
          onClick={handlopenPrice}
          className="flex flex-row justify-between w-full"
        >
          Price
          {openPrice ? (
            <RemoveIcon sx={{ fontSize: 20 }} />
          ) : (
            <AddIcon sx={{ fontSize: 20 }} />
          )}
        </div>
        {openPrice ? PRICE() : null}
      </li>
    </ul>
  );

  return (
    <div className="flex flex-col  lg:py-0 lg:px-0 lg:w-max-[1184px] lg:w-[1184px] lg:m-auto min-h-screen">
      <div className="flex flex-col ">
        <Breadcrumbs
          py={1}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          fontSize="small"
          className="p-2 lg:p-0 bg-gray-100 lg:bg-white"
        >
          {breadcrumbs}
        </Breadcrumbs>
        {/* <section className="border-b-2 border-gray-100 py-4">
          <button
            onClick={toggleDrawer(true)}
            className="flex flex-row px-4 py-2 text-white bg-teal-500 rounded"
          >
            Filters <TuneIcon className="ml-2" />
          </button>
          <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
            {filter()}
          </Drawer>
        </section> */}
        <section className="flex flex-col lg:flex-row lg:px-0">
          <section className="hidden lg:flex flex-col lg:w-1/4">
            {filter()}
          </section>
          <div className="flex flex-col lg:w-3/4">
            <div className="flex flex-col shadow">
              <section className="flex flex-col  rounded">
                <div className="flex items-center py-[26px] px-[24px] border-b border-gray-200">
                  Cameras
                  <span className="ml-2 flex text-sm rounded-full items-center py-1 px-3 bg-slate-100">
                    {allProducts?.count}
                  </span>
                </div>
                <section className="lg:hidden flex flex-col">
                  {filtermob()}
                </section>
                <p className="hidden lg:flex py-[26px] px-[24px] border-b border-gray-200">
                  Sort by:
                </p>
              </section>
              {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {Array.from({ length: 9 }, () => SKELETON)}
                </div>
              ) : grid ? (
                <>
                  <section className="grid grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-[1px]">
                    {products.products?.map((data) => (
                      <ProductsCardGrid product={data} key={data.id} />
                    ))}
                  </section>
                </>
              ) : (
                <>
                  <section className="flex flex-col bg-gray-200 gap-[1px]">
                    {products.products?.map((data) => (
                      <ProductsCardFlex product={data} key={data.id} />
                    ))}
                  </section>
                </>
              )}
            </div>
            <section className="flex justify-center my-4">
              <Pagination
                shape="rounded"
                size="large"
                count={products?.count}
                page={page}
                onChange={handleChange}
                onClick={() => window.scrollTo(0, 0)}
              />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
