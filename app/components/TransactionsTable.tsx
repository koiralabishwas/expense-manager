"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

interface res {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  transactions: {
    [key: string]: {
      id: string;
      type: string;
      category: string;
      description: string;
      amount: number;
      at: string;
      method: string;
    }[]
  }
}

const fetchTransactions = async () => {
  const response = await fetch("/api/v2/balance/660feb11f3723956e57ee2dc");
  if (!response.ok) {
    throw new Error("response error");
  }
  return response.json();
};

const TransactionsTable = () => {
  // defie the schema of the mongo db
  const { data, isLoading, isError, error } = useQuery<res>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(),
  });
  console.log(data);

  if (isLoading) {
    return <div className="text-white text-5xl loading-spinner"></div>;
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
