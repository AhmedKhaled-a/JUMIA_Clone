import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Order from "./Order/Order";
import { useEffect, useState } from "react";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Shipping"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Processing"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Shipping"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Shipping')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Processing')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function Orders() {

  let { sellerOrders } = useState(null);

  useEffect(() => {
    console.log(sellerOrders);
  } , [])

  return (
      <div className="Table">
      <h3>Recent Orders</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell>Product</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>

              </TableRow>

            </TableHead>

            <TableBody style={{ color: "white" }}>

              {sellerOrders?.map((sellerOrder) => (
                <Order order={sellerOrder} key={sellerOrder.id} />
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}