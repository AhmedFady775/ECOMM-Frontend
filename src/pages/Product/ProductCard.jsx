import React from "react";
import { Link } from "react-router-dom";

function ProductsCard({ product }) {
  return (
    <Link
      className="flex flex-col px-6 py-5 bg-white hover:shadow-2xl transition-all"
      to={`/products/${product._id}`}
    >
      <div className="mb-10 mx-auto">
        <div className="lg:h-[168px] lg:w-[168px] h-[120px] w-[120px]">
          <img
            className="h-full w-full object-contain"
            src={product.image}
            alt={product.title}
          />
        </div>
      </div>
      <p className="flex mb-2 h-10">{product.slug} </p>
      <div className="flex flex-row items-end">
        <p className="leading-4 text-xl	font-semibold"> {product.price}</p>
        <p className="text-xs ml-1 leading-3">EGP</p>
      </div>
    </Link>
  );
}

export default ProductsCard;
