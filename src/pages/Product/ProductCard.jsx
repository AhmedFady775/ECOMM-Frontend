import React from "react";
import { Link } from "react-router-dom";

function ProductsCard({ product }) {
  return (
    <div className="flex flex-col w-fit bg-white rounded-md">
      <Link className="flex" to={`/${product._id}`}>
        <img
          className="h-[20vh] sm:h-[30vh] object-cover"
          src={product.image}
          alt={product.title}
        />
      </Link>
      <p className="py-2">{product.category} </p>
      <strong className="py-2">{product.price} EGP</strong>
    </div>
  );
}

export default ProductsCard;
