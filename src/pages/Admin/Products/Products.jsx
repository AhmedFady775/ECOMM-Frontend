import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Store } from "../../../components/Store";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/joy/LinearProgress";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function Products() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, product, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [choose, setChoose] = useState(false);

  const location = useLocation();

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `https://ecomm12.herokuapp.com/products/${product._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "DELETE_SUCCESS" });
        toast.success("product successfully deleted");
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://ecomm12.herokuapp.com/products/allproducts`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <div className="flex flex-col p-4 min-h-screen lg:w-[85vw]">
      <div>
        {loadingDelete && <LinearProgress />}
        {loading ? (
          <LinearProgress />
        ) : (
          <div className="flex flex-col">
            <div className="hidden md:flex flex-col cursor-pointer mb-4">
              <div
                onClick={() => setChoose(!choose)}
                className="flex flex-row items-end  mb-2"
              >
                <p className="text-3xl"> Products</p>
                <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
              </div>
              {choose ? (
                <div className="flex flex-col mb-4 w-fit text-lg ml-4 py-2 border shadow-lg rounded">
                  <Link className="px-4 py-2 hover:bg-slate-200" to="/products">
                    Manage Products
                  </Link>
                  <Link
                    className="px-4 py-2 hover:bg-slate-200"
                    to="/createproduct"
                  >
                    Create Product
                  </Link>
                </div>
              ) : null}
            </div>

            <TableContainer className="hidden sm:flex" component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">CREATED AT</StyledTableCell>
                    <StyledTableCell align="center">SLUG</StyledTableCell>
                    <StyledTableCell align="center">PRICE</StyledTableCell>
                    <StyledTableCell align="center">QUANTATIY</StyledTableCell>
                    <StyledTableCell align="center">ACTIONS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.products.map((product) => (
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        <div className="flex justify-center">
                          <img src={product.image} width={200} />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.createdAt.substring(0, 10)}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.slug}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.countInStock}
                      </StyledTableCell>
                      <StyledTableCell className="space-x-4" align="center">
                        <button
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <CreateIcon />
                        </button>
                        <button onClick={() => deleteHandler(product)}>
                          <DeleteIcon />
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex flex-col sm:hidden">
              {product.products.map((product) => (
                <div className="flex flex-col border-b-2 py-2">
                  <strong>{product.createdAt.substring(0, 10)}</strong>
                  <strong>ID: {product._id}</strong>
                  <div className="my-4">
                    <img src={product.image} />
                  </div>
                  <div>SLUG: {product.slug}</div>
                  <div>PRICE: {product.price}</div>
                  <div>QUANTATIY: {product.countInStock}</div>

                  <div className="flex flex-row mt-4 ">
                    <Button
                      variant="contained"
                      sx={{ marginRight: 2 }}
                      size="small"
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                    >
                      edit{" "}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => deleteHandler(product)}
                    >
                      delete{" "}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
