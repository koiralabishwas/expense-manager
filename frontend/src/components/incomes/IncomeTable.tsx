'use client'
import { Session } from 'next-auth';
import React from 'react'
import TableView from '../TableView';

interface Props {
  session : Session
  incomes : Array<any>
}

const IncomeTable = ({session , incomes} : Props) => {

  const deleteIncome = (id : string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
  }
  return (
    <TableView deleteRecord={deleteIncome} records={incomes} />
  )
}

export default IncomeTable
