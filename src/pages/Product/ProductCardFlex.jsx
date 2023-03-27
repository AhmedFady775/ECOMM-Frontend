import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function ProductsCardFlex({ product }) {
  return (
    <Link
      className="flex flex-row px-4 py-5 bg-white lg:hover:shadow-2xl transition-all"
      to={`/products/${product._id}`}
    >
      <div className="">
        <div className="lg:h-[168px] lg:w-[168px] h-[120px] w-[120px]">
          {product.image ? (
            <img
              className="h-full w-full object-contain"
              src={product.image}
              alt={product.title}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
      <div className="flex flex-col ml-6">
        <p className="flex h-10">{product.slug} </p>
        <div className="flex flex-row items-end">
          <p className="leading-4 text-xl font-semibold"> {product.price}</p>
          <p className="text-xs ml-1 leading-3">EGP</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductsCardFlex;
