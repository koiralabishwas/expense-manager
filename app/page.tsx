"use client";
import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import NavBar from "./components/NavBar";
import { useFetch } from "./hooks/useFetchUser";
import TransactionsTable from "./components/TransactionsTable";

export default function Home() {
  return (
   <div>
    <TransactionsTable></TransactionsTable>
   </div>
  );
}
