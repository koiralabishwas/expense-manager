import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <main >
      <Button  variant="contained" size="large" type="button" sx={{borderRadius : '10px'}}>Hello World</Button>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
