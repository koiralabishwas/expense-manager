import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface Income{
  _id : string,
  description : string ,
  amount : number , 
  currency : string,
  genre : string , 
  createdAt : string
}

interface Props{
  incomes : Income[]
}

const IncomeTable = ({incomes} : Props) => {
  console.log(incomes)
  return (
    <TableContainer component={Paper}>
      <Table  aria-label='simple table' >
        <TableHead>
          <TableRow>
              <TableCell >descripion</TableCell>
              <TableCell align='right'>amount</TableCell>
              <TableCell align='right'>genre</TableCell>
              <TableCell align='right'>currency</TableCell>
              <TableCell align='right'>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomes.map((income) => (
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

export default IncomeTable