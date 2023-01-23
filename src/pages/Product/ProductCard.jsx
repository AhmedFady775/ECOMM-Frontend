import React from "react";
import { Link } from "react-router-dom";

function ProductsCard({ product }) {
  return (
    <div className="flex flex-col w-fit bg-white rounded-md">
      <Link className="flex" to={`/products/${product._id}`}>
        <div className="h-[20vh] sm:h-[35vh]">
          <img
            className="h-full w-full object-contain"
            src={product.image}
            alt={product.title}
          />
        </div>
      </Link>
      <p className="py-2">{product.slug} </p>
      <strong className="py-2">{product.price} EGP</strong>
    </div>
  );
}

export default ProductsCard;
