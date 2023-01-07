import axios from "axios";
import { useReducer, useEffect, useState } from "react";
import ProductsCard from "./Product/ProductCard";
import Loading from "../components/Loading/Loading";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TuneIcon from "@mui/icons-material/Tune";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Shop() {
  const filter = () => (
    <div className="h-[100vh]">
      <section className="flex-col flex px-6 py-10 text-black space-y-6  text-xl font-medium">
        <ul className="flex flex-col text-black space-y-8">
          <li className="flex felx-row justify-between">
            <span>
              <AddIcon className="mr-4" sx={{ fontSize: 20 }} />
              Sort
            </span>
            <CloseIcon onClick={toggleDrawer(false)} sx={{ fontSize: 30 }} />
          </li>
          <li className="flex felx-row items-center">
            <AddIcon className="mr-4" sx={{ fontSize: 20 }} />
            Category{" "}
          </li>
          <li className="flex felx-row items-center">
            <AddIcon className="mr-4" sx={{ fontSize: 20 }} />
            Price{" "}
          </li>
        </ul>
      </section>
    </div>
  );

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:3001/products?page=${page}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="sm:flex justify-center p-4 min-h-screen ">
      {loading ? (
        <Loading />
      ) : error ? (
        <div> {error}</div>
      ) : (
        <div className="flex flex-col lg:w-[80%]">
          <section className="border-b-2 border-gray-100 pb-4">
            <Link to="/">Home</Link> <KeyboardArrowRight />{" "}
            <strong>Shop</strong>
          </section>
          <section className="border-b-2 border-gray-100 py-4">
            <button
              onClick={toggleDrawer(true)}
              className="flex flex-row px-4 py-2 text-white bg-teal-500 rounded"
            >
              Filters <TuneIcon className="ml-2" />
            </button>
            <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
              {filter()}
            </Drawer>
          </section>
          <section className="flex py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.products?.map((product) => (
                <ProductsCard product={product} key={product.id} />
              ))}
            </div>
          </section>
          <section className="flex justify-center">
            <Stack spacing={2}>
              <Pagination
                shape="rounded"
                size="large"
                count={product.count}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </section>
        </div>
      )}
    </div>
  );
}

export default Shop;
