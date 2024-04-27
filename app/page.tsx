"use client";
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
