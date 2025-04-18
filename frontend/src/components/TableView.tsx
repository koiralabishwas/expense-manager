import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

type Column = {
  _id : string,
  description : string ,
  amount : number , 
  currency : string,
  genre : string , 
  createdAt : string
}

interface Props{
  records : Column[]
}

const columnLabels: Partial<Record<keyof Column, string>> = {
  description: "Description",
  amount: "Amount",
  currency: "Currency",
  genre: "Genre",
  createdAt: "Date",
};
const columnKeys =  Object.keys(columnLabels) as (keyof Column)[];


const TableView = ({records} : Props) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label='simple table' >
        <TableHead>
          <TableRow>
          {columnKeys.map((column) => (
            <TableCell sx={{textAlign : "left"}} key={column} >{column}</TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((income) => (
            <TableRow key={income._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope='row'>{income.description}</TableCell>
              <TableCell align='right' >{income.amount}</TableCell>
              <TableCell align='right' >{income.genre}</TableCell>
              <TableCell align='right' >{income.currency}</TableCell>
              <TableCell align='right'>{new Date(income.createdAt).toLocaleDateString("sv-SE").replace(/-/g, "/")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView