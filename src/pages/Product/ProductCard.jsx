import React from "react";
import { Link } from "react-router-dom";

function ProductsCard({ product }) {
  return (
    <div className="flex flex-col w-fit lg:w-96 bg-white rounded-md">
      <Link className="flex" to={`/${product._id}`}>
        <img
          className="w-40 h-40 lg:w-80 lg:h-80 object-cover"
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
