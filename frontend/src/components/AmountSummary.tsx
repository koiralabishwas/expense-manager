'use client'
import { ExpenseSummary } from "@/app/actions/expense.server";

interface Props { 
  expenseSumarry : ExpenseSummary 
}
export default function AmountSummary({expenseSumarry} : Props) {
  console.log(expenseSumarry)

  return (
    <>
      {Object.entries(expenseSumarry).map(([key, value]) => (
      typeof value === 'object' && value !== null ? (
        <div key={key}>
        <div>{key} :</div>
        <div style={{ paddingLeft: 16 }}>
          {Object.entries(value).map(([subKey, subValue]) => (
          <div key={subKey}>
            {subKey} : {subValue.toString()}
          </div>
          ))}
        </div>
        </div>
      ) : (
        <div key={key}>
        {key} : {value.toString()}
        </div>
      )
      ))}
    </>
  )
}
