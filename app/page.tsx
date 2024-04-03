import Image from "next/image";
import clientPromise from "@/lib/monogodb";
import FetchUserData from "./components/FetchUserBalance";

export default function Home() {

  return (
    <div>
      Hello World
      <FetchUserData />
    </div>
  );
}
