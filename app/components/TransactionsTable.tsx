"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetchUser';


const TransactionsTable = () => {
  // select the current month of the sheet in format i.e 20XX/0X
  const defaultDate = new Date().toISOString().substring(0, 7).replace('-', '/')

  // to store mothData [2024/03, 2024/04...]
  const [availableMonthSheets , setAvailableMonthSheets] = useState<string[][]>()

  // rendet the sheet of selected month Sheet
  const [selectedSheet , setSelectedSheet] = useState(defaultDate)

  // fetch the user Transactions
  const { data, error, isloading } = useFetch(
    "api/v2/balance/660feb11f3723956e57ee2dc"
  );

  //  to filter the monthSheets from fetched Transactions
  const getMonthSheets = useCallback(() => {
    if (!data) return;
    const dateTitle = data.map(theData => Object.keys(theData.transactions));
    return dateTitle;
  }, [data]);

  // console.log(getMonthSheets())

  useEffect(() => {
    if (!data) return;
    setAvailableMonthSheets(getMonthSheets());
  }, [data, selectedSheet, getMonthSheets])
  
 

  return (
    <div className="grid place-items-center pb-16 text-white text-lg table table-zebra-zebra overflow-x-auto">
        <select id="sheetDate" onChange={e => {setSelectedSheet(e.target.value)}}>
          <option value={defaultDate} defaultValue={defaultDate}>{defaultDate}</option>
          {availableMonthSheets && availableMonthSheets[0].map(monthSheets => <option key={monthSheets} value={monthSheets}>{monthSheets}</option>)}
          
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
          {/* only render after a date is selected */}
          {selectedSheet && data &&
            data.map((thedata) =>
              thedata.transactions[selectedSheet].map((transaction) => (
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