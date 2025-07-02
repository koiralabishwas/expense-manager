import { Typography } from "@mui/material";

export default function InDevelopmentAlert() {
  return (
    <Typography
      variant="h3"
      sx={{
        color: "red",
        backgroundColor: "slateblue",
        display: "flex",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >開発中</Typography>
  )
}
