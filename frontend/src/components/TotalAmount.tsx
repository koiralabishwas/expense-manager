
interface Props { 
  records : Income[] | Expense[]
}
export default function TotalAmount({records} : Props) {
  const total = records.reduce((sum, r) => sum + r.amount, 0)
  return (
    <div>Total : {total}</div>
  )
}
