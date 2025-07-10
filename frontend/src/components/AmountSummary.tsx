
interface Props { 
  records : Transaction[]
}
export default function AmountSummary({records} : Props) {
  records.map((r) => r)
  const total = records.reduce((sum, r) => sum + r.amount, 0)
  const genres = new Set(records.map(r => r.genre));
  const genreTotals = Array.from(genres).map(genre => {
    const genreTotal = records
      .filter(r => r.genre === genre)
      .reduce((sum, r) => sum + r.amount, 0);
    return { genre, total: genreTotal };
  });

  return (
    <>
      <div>Total : {total}</div>
      {genreTotals.map((g) => (
        <div key={g.genre}>{g.genre} : {g.total}</div>
      ))}
    </>
  )
}
