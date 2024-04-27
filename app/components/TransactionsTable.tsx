"use client";
import React, { useState } from 'react'
import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import NavBar from './NavBar';
import { useFetch } from '../hooks/useFetchUser';

const TransactionsTable = () => {
  const defaultDate = new Date().toISOString().substring(0, 7).replace('-', '/')
  const { data, error, isloading } = useFetch(
    "api/v2/balance/660feb11f3723956e57ee2dc"
  );

  const [monthSheet , setMonthSheet] = useState<string[][]>()
  const [sheetDate , setSheetDate] = useState(defaultDate)
  
  if (data) {
    const dateTitle = data.map(theData => Object.keys(theData.transactions))
    console.log(dateTitle)
    setMonthSheet(dateTitle)
  }

 

  const filteredData = data?.map(theData => ({...theData , transactions : theData.transactions[sheetDate] || []}))


  return (
    <div className="grid place-items-center pb-16 text-white text-lg table table-zebra-zebra overflow-x-auto">
        <select id="sheetDate" onChange={e => {setSheetDate(e.target.value)}}>
          <option value={defaultDate} defaultValue={defaultDate}>{defaultDate}</option>
          {monthSheet && monthSheet.map( monthSheets => <option key={monthSheets[0]} value={monthSheets[0]}>{monthSheets[0]}</option> )}
        </select>
      
      <table className="text-lg">
        <thead>
          <tr className="text-white">
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>At</th>
            <th>Pavement</th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          {sheetDate && data &&
            data.map((thedata) =>
              thedata.transactions[sheetDate].map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{new Date(transaction.at).toLocaleDateString()}</td>
                  <td>{transaction.method}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );

}

export default TransactionsTable