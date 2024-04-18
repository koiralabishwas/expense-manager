"use client";
import React from 'react'
import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import NavBar from './NavBar';
import { useFetch } from '../hooks/useFetchUser';

const TransactionsTable = () => {
 
  const dateKey = "2024/04";
  const { data, error, isloading } = useFetch(
    "api/v2/balance/660feb11f3723956e57ee2dc"
  );


  return (
    <div className="grid place-items-center pb-16 text-white text-lg table table-zebra-zebra overflow-x-auto">
      <table className="text-lg">
        <thead>
          <tr className="text-white">
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>At</th>
            <th>Pavement</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((thedata) =>
              thedata.transactions[dateKey].map((transaction) => (
                <tr key={transaction.id}>
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