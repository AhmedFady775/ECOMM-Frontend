import { Link, useParams } from "react-router-dom";
import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Store } from "../../components/Store";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";

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

function ProductScreen() {
  const { id } = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `https://ecomm-i8yz.onrender.com/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    toast.success("Added to cart");
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `https://ecomm-i8yz.onrender.com/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <Loading />
  ) : error ? (
    <div> {error} </div>
  ) : (
    <>
      <div className="flex flex-col p-4 bg-white min-h-screen">
        <section className="border-b-2 border-gray-100 pb-4">
          <Link to="/">Home</Link> <KeyboardArrowRight />
          <Link to="/shop">Shop</Link>
          <KeyboardArrowRight /> <strong> {product.slug}</strong>
        </section>
        <div className="flex lg:justify-center flex-col lg:flex-row  py-10">
          <div className="flex justify-center">
            <img
              className="flex w-52 h-80 lg:w-[600px] lg:h-[600px] object-cover"
              src={product.image}
              alt={product.id}
            />
          </div>
          <div className="flex flex-col lg:pl-60 lg:w-[50%]">
            <p className="text-xl lg:pt-0 pt-4">{product.name}</p>
            <strong className="text-xl pt-2 pb-6">{product.price} EGP</strong>
            <p className="flex py-2 text-xl font-medium">Descreption</p>
            <p className="text-justify">{product.descreption}</p>
            <p className="flex py-2 text-xl font-medium">Quantity</p>
            <div className="flex flex-row text-center p-4 bg-slate-100 w-fit rounded">
              <RemoveIcon className="rounded mr-4 p-1 bg-teal-500 text-white" />
              {product.countInStock}
              <AddIcon className="rounded ml-4 p-1 bg-teal-500 text-white" />
            </div>
            <div className="hidden lg:flex flex-row bottom-0 py-4 bg-white space-x-4">
              <button className=" bg-teal-500 text-white text-lg rounded py-2 w-full">
                Buy now
              </button>
              <button
                onClick={addToCartHandler}
                className="border-2 border-teal-500 text-teal-500 text-lg rounded py-2 w-full"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky lg:hidden bottom-0 p-4 bg-white space-y-4 drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)]">
        <button className=" bg-teal-500 text-white text-lg rounded py-2 w-full">
          Buy now
        </button>
        <button
          onClick={addToCartHandler}
          className="border-2 border-teal-500 text-teal-500 text-lg rounded py-2 w-full"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
export default ProductScreen;
