import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import FetchUserData from "./components/FetchUserData";



export default function Home() {

  return (
    <div>
      <div>Hello</div>
      <p>this is my expense-tracker app</p>
      <FetchUserData />
    </div>
  );
}
