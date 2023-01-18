import { useState } from "react";
import ProductsCard from "./Product/ProductCard";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TuneIcon from "@mui/icons-material/Tune";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/joy/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Shop = () => {
  const filter = () => (
    <div className="h-screen">
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

  // const [{ loading, error, product }, dispatch] = useReducer(reducer, {
  //   product: [],
  //   loading: true,
  //   error: "",
  // });

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_REQUEST" });
  //     try {
  //       const result = await axios.get(
  //         `https://ecomm-i8yz.onrender.com/products?page=${page}`
  //       );
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: "FETCH_FAIL", payload: err.message });
  //     }
  //   };
  //   fetchData();
  // }, [page]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", { page }],
    queryFn: () =>
      axios
        .get(`https://ecomm-i8yz.onrender.com/products?page=${page}`)
        .then((res) => res.data),
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center w-full p-4 min-h-screen">
      <div className="flex flex-col lg:w-[80%]">
        <section className="border-b-2 border-gray-100 pb-4">
          <Link to="/">Home</Link> <KeyboardArrowRight /> <strong>Shop</strong>
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
        {isLoading ? (
          <div className="min-h-screen p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton height={300} variant="rectangle" />
              <Skeleton
                height={10}
                width={200}
                sx={{ borderRadius: "4px" }}
                variant="rectangle"
              />
              <Skeleton
                height={10}
                sx={{ borderRadius: "4px" }}
                width={100}
                variant="rectangle"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton height={300} variant="rectangle" />
              <Skeleton
                height={10}
                width={200}
                sx={{ borderRadius: "4px" }}
                variant="rectangle"
              />
              <Skeleton
                height={10}
                sx={{ borderRadius: "4px" }}
                width={100}
                variant="rectangle"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton height={300} variant="rectangle" />
              <Skeleton
                height={10}
                width={200}
                sx={{ borderRadius: "4px" }}
                variant="rectangle"
              />
              <Skeleton
                height={10}
                sx={{ borderRadius: "4px" }}
                width={100}
                variant="rectangle"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton height={300} variant="rectangle" />
              <Skeleton
                height={10}
                width={200}
                sx={{ borderRadius: "4px" }}
                variant="rectangle"
              />
              <Skeleton
                height={10}
                sx={{ borderRadius: "4px" }}
                width={100}
                variant="rectangle"
              />
            </div>
          </div>
        ) : (
          <section className="flex py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.products?.map((data) => (
                <ProductsCard product={data} key={data.id} />
              ))}
            </div>
          </section>
        )}
        <section className="flex justify-center">
          <Stack spacing={2}>
            <Pagination
              shape="rounded"
              size="large"
              count={data?.count}
              page={page}
              onChange={handleChange}
              onClick={() => window.scrollTo(0, 0)}
            />
          </Stack>
        </section>
      </div>
    </div>
  );
};

export default Shop;
