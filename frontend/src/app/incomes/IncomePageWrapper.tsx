"use client";
import FormModal from "@/components/FormModal";
import { Session } from "next-auth";
import React, { useState } from "react";
import PostIncome from "./PostIncome";
import TableView from "@/components/TableView";

interface Props {
  initialColumns: Array<any>;
  session: Session;
}

const IncomePageWrapper = ({ initialColumns, session }: Props) => {
  const [columns, setColumns] = useState(initialColumns);

  const handleDelete = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    setColumns((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div>
      <FormModal>
        <PostIncome
          onPost={(newIncome: any) => {
            setColumns((previous) => [...previous, newIncome]);
          }}
        />
      </FormModal>
      <TableView records={columns} deleteRecord={handleDelete} />
    </div>
  );
};

export default IncomePageWrapper;
