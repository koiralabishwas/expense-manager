"use client";
import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import FetchUserData from "./components/FetchUserData";
import NavBar from "./components/NavBar";
import { useFetch } from "./hooks/useFetchUser";

export default function Home() {
  const dateKey = "2024/04";
  const { data, error, isloading } = useFetch(
    "api/v2/balance/660feb11f3723956e57ee2dc"
  );

  console.log(data);
  console.log(error);
  console.log(isloading);

  return (
    <div>
      {data &&
        data.map(thedata => (
          thedata.transactions[dateKey].map(transaction => (
            <div key={transaction.id}>
            <p>Description : {transaction.description}</p>
            <p>Amount : {transaction.amount}</p>
            <p>Date : {transaction.at}</p>
            <p>Category : {transaction.category}</p>
            <p>Method : {transaction.method}</p>
          </div>
          ))
        ))}
    </div>
  );
}
