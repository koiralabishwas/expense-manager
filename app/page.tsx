"use client";
import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import NavBar from "./components/NavBar";
import { useFetch } from "./hooks/useFetchUser";
import TransactionsTable from "./components/TransactionsTable";
import TransactionForm from "./components/TransactionForm";

export default function Home() {
  return (
   <div>
    <TransactionForm></TransactionForm>
    <TransactionsTable></TransactionsTable>
   </div>
  );
}
