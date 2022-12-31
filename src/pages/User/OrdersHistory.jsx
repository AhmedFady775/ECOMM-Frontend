import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../../components/Store";
import Loading from "../../components/Loading/Loading";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrdersHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:3001/orders/mine",

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: error,
        });
      }
    };
    fetchData();
  }, [userInfo]);

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
    <div className="flex flex-col p-4 min-h-screen">
      <strong className="text-lg mt-2 mb-4">Orders history</strong>
      {loading ? (
        <Loading />
      ) : error ? (
        { error }
      ) : (
        <>
          <TableContainer className="hidden md:flex" component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">DATE</StyledTableCell>
                  <StyledTableCell align="center">TOTAL</StyledTableCell>
                  <StyledTableCell align="center">PAID</StyledTableCell>
                  <StyledTableCell align="center">DELIVERED</StyledTableCell>
                  <StyledTableCell align="center">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {order.createdAt.substring(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.totalPrice.toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex flex-col md:hidden">
            {orders.map((order) => (
              <div className="flex flex-col border-b-2 py-2">
                <strong>{order.createdAt.substring(0, 10)}</strong>
                <strong>ID: {order._id}</strong>
                <div>TOTAL: {order.totalPrice.toFixed(2)}</div>
                <div>
                  PAID: {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                </div>
                <div>
                  DELIVERED:{" "}
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </div>
                <div>
                  <button
                    className="px-6 py-2 text-white bg-teal-500 rounded my-2"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
