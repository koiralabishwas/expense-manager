"use client"
import { registerTempUser, verifyTempUser } from "@/server/auth.server";

const Page = () => {
  

  return (
    <div>
      <div>

      check tempUser auto delete
      </div>
      <button onClick={async ()  =>console.log( await registerTempUser({email : "wasubisu69@gmail.com" , name : "hogehoge" , password : "hogehoge"}))}>hit me</button>

      <div>verify</div>
            <button onClick={async ()  => await verifyTempUser("69785ed6c0d6faced195dff8","437791")}>hit me</button>

    </div>
  );
};

export default Page;
