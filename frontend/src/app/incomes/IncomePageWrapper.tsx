"use client";
import FormModal from "@/components/FormModal";
import { Session } from "next-auth";
import React, { useState } from "react";
import PostIncome from "./PostIncome";
import IncomeTable from "@/components/incomes/IncomeTable";

interface Props {
  initialIncomes: Array<any>;
  session: Session;
}

const IncomePageWrapper = ({ initialIncomes, session }: Props) => {
  const [incomes, setIncomes] = useState(initialIncomes);

  return (
    <div>
      <FormModal>
        <PostIncome
          onPost={(newIncome: any) => {
            console.log("new INcome", newIncome);
            setIncomes((previous) => [...previous, newIncome]);
          }}
        />
      </FormModal>
      <IncomeTable
        onDelete={(id: string) => {
          console.log("deletedIncome" , id);
          setIncomes(incomes.filter((i) => i._id !== id));
        }}
        session={session}
        incomes={incomes}
      />
    </div>
  );
};

export default IncomePageWrapper;
