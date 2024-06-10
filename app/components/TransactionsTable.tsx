"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
  const response = await fetch("/api/v2/balance/660feb11f3723956e57ee2dc");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const TransactionsTable = () => {
  // defie the schema of the mongo db
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(),
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>hello</div>
    // <div className='alert'>
    //   {data && data.map((transaction: any) => (
    //     <div key={transaction.id}>
    //       <p>{transaction.type}</p>
    //       <p>{transaction.category}</p>
    //       <p>{transaction.description}</p>
    //       <p>{transaction.amount}</p>
    //       <p>{new Date(transaction.at).toLocaleDateString()}</p>
    //       <p>{transaction.method}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default TransactionsTable;
