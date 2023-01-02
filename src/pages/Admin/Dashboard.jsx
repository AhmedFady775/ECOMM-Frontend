import React, { useContext, useEffect, useReducer, useState } from "react";
// import Chart from "react-google-charts";
import axios from "axios";
import { Store } from "../../components/Store";
import Loading from "../../components/Loading/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function Dashboard() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://ecomm-i8yz.onrender.com1/orders/summary",
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: err,
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="flex w-full justify-center">
      {loading ? (
        <Loading />
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div className="flex flex-col w-full p-4 gap-4">
          <div className="flex flex-col gap-4 justify-center lg:flex-row">
            <div className="p-6 border-1 bg-white rounded-md shadow-md flex flex-col lg:w-1/3">
              <div className="flex flex-row">
                <span>
                  <img src="https://img.icons8.com/windows/40/null/guest-male--v1.png"></img>
                </span>
                <div className="ml-4 flex flex-col">
                  <strong className="text-lg">Number of Users</strong>
                  <span>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}{" "}
                    Users
                  </span>
                </div>
              </div>
              <div className="flex flex-row-reverse ">
                <strong className=" text-xs rounded p-2 bg-gray-300">
                  More info
                </strong>
              </div>
            </div>

            <div className="p-6 border-1 bg-white rounded-md shadow-md flex flex-col lg:w-1/3">
              <div className="flex flex-row">
                <span>
                  <img src="https://img.icons8.com/windows/40/null/purchase-order.png"></img>
                </span>
                <div className="ml-4 flex flex-col">
                  <strong className="text-lg">Number of Orders</strong>
                  <span>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}{" "}
                    Orders
                  </span>
                </div>
              </div>
              <div className="flex flex-row-reverse ">
                <strong className=" text-xs rounded p-2 bg-gray-300">
                  More info
                </strong>
              </div>
            </div>

            <div className="p-6 border-1 bg-white rounded-md shadow-md flex flex-col lg:w-1/3">
              <div className="flex flex-row">
                <span>
                  <img src="https://img.icons8.com/windows/40/null/money.png"></img>
                </span>
                <div className="ml-4 flex flex-col">
                  <strong className="text-lg">Net Cash</strong>
                  <span>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}{" "}
                    L.E
                  </span>
                </div>
              </div>
              <div className="flex flex-row-reverse ">
                <strong className=" text-xs rounded p-2 bg-gray-300">
                  More info
                </strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col justify-center items-center py-2 border-1 bg-white rounded-md  shadow-md">
              <strong>Sales</strong>
              {summary.dailyOrders.length === 0 ? (
                <div>No Sale</div>
              ) : (
                <Chart
                  width="100%"
                  chartType="AreaChart"
                  height="400px"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div> */}
            {/* <div className="flex flex-col justify-center items-center py-2 border-1 bg-white rounded-md  shadow-md">
              <strong>Categories</strong>
              {summary.productCategories.length === 0 ? (
                <div>No Category</div>
              ) : (
                <Chart
                  width="100%"
                  chartType="PieChart"
                  height="400px"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Category", "Products"],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                ></Chart>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
