export default function InDevelopmentAlert() {
  return (
    <div
      style={{
        backgroundColor: "#ffeaea",
        borderRadius: "3px",
        padding: "8px 12px",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          fontFamily: "inherit",
          fontWeight: 500,
          fontSize: "0.85rem",
          color: "#2a3d11ff",
        }}
      >
        開発中のため、起動がおかしいときは一回 logout してみてください
      </span>
    </div>
  )
}
