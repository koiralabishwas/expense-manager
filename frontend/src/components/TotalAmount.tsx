
interface Props { 
  records : Transaction[]
}
export default function TotalAmount({records} : Props) {
  records.map((r) => r)
  const total = records.reduce((sum, r) => sum + r.amount, 0)
  return (
    <div>Total : {total}</div>
  )
}
