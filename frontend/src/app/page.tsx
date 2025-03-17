import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <Button variant="contained" size="large" type="button" sx={{borderRadius : '10px'}}>Hello World</Button>


      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
