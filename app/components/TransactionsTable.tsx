"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetchUser';
import { shallowEqual } from 'shallow-equal';


const TransactionsTable = () => {
  const defaultDate = new Date().toISOString().substring(0, 7).replace('-', '/')
  console.log("new date is ",new Date())
  const { data, error, isloading } = useFetch(
    "api/v2/balance/660feb11f3723956e57ee2dc"
  );
// to store mothData [2024/03, 2024/04...]
  const [availableMonthSheets , setAvailableMonthSheets] = useState<string[][]>()
  const [sheetDate , setSheetDate] = useState(defaultDate)

  // Use useCallback for memoized dateTitle calculation
  const getMonthSheets = useCallback(() => {
    if (!data) return;
    const dateTitle = data.map(theData => Object.keys(theData.transactions));
    return dateTitle;
  }, [data]);

  // console.log(getMonthSheets())

  useEffect(() => {
    if (!data) return;

    setAvailableMonthSheets(getMonthSheets());
    
  }, [data, sheetDate, getMonthSheets, shallowEqual])
  
 

  return (
    <div className="grid place-items-center pb-16 text-white text-lg table table-zebra-zebra overflow-x-auto">
        <select id="sheetDate" onChange={e => {setSheetDate(e.target.value)}}>
          <option value={defaultDate} defaultValue={defaultDate}>{defaultDate}</option>
          {/* {monthSheet && monthSheet.map( monthSheets => <option key={monthSheets[0]} value={monthSheets[0]}>{monthSheets[0]}</option> )} */}
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