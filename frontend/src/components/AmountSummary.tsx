'use client'

interface Props { 
  summary : ExpenseSummary | IncomeSummary
}
export default function AmountSummary({summary} : Props) {

  return (
    <>
      {Object.entries(summary).map(([key, value]) => (
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
