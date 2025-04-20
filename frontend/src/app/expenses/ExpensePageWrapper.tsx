"use client";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import FormModal from "@/components/FormModal";
import React, { useState } from "react";
import PostExpense from "./PostExpense";
import { Session } from "next-auth";

interface Props {
  session: Session;
  expenses: Array<any>;
}

const ExpensePageWrapper = ({ session, expenses: initialExpenses }: Props) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  return (
    <div>
      <FormModal>
        <PostExpense
          onPost={(expense) => setExpenses((prev) => [...prev, expense])}
        />
      </FormModal>
      <ExpenseTable
        onDelete={(id) => setExpenses(expenses.filter((e) => e._id !== id))}
        session={session}
        expenses={expenses}
      />
    </div>
  );
};

export default ExpensePageWrapper;
