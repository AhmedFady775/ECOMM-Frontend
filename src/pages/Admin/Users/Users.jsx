import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };
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

export default function Users() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const deleteHandler = async (users) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`https://ecomm12.herokuapp.com/users/${users._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
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
          `https://ecomm12.herokuapp.com/users`,
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
        {loading ? (
          <LinearProgress />
        ) : (
          <div>
            <TableContainer className="hidden md:flex" component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CREATED AT</StyledTableCell>
                    <StyledTableCell align="center">FIRST NAME</StyledTableCell>
                    <StyledTableCell align="center">LAST NAME</StyledTableCell>
                    <StyledTableCell align="center">EMAIL</StyledTableCell>
                    <StyledTableCell align="center">ACTIONS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        {user.createdAt}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.firstName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.lastName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        {user.email}
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
            <div className="flex flex-col md:hidden">
              {users.map((user) => (
                <div className="flex flex-col border-b-2 py-2">
                  <strong>{user.createdAt.substring(0, 10)}</strong>
                  <strong>ID: {user._id}</strong>
                  <div>TOTAL: {user.firstName}</div>
                  <div>PAID: {user.lastName}</div>
                  <div>DELIVERED: {user.email}</div>
                  <div>
                    <button
                      className="px-6 py-2 text-white bg-teal-500 rounded my-2"
                      onClick={() => {
                        navigate(`/user/${user._id}`);
                      }}
                    >
                      Details
                    </button>
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
