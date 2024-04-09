import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import FetchUserData from "./components/FetchUserData";
import NavBar from "./components/NavBar";



export default function Home() {
  // const date = '2024-04-05T04:52:02.706Z'
  // const japanDate = new Date(date).toLocaleDateString("en-us" , {timeZone : "Asia/Tokyo"})

  return (
    <div>
      <div>Hello</div>
      <p>this is my expense-tracker app</p>
      <p>{}</p>
      <FetchUserData />
    </div>
  );
}
