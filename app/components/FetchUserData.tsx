"use client";
import React, { useEffect, useState } from "react";

interface Data {
  _id: string;
  amount: number;
  category: string;
  description: string;
  method: string;
  type: string;
  userId: string;
}

const FetchUserData = () => {
  const [userData, setUserData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: fetch user data dynamaicly later on
      const response = await fetch("api/v1/balance/66063d32d45d4104783ec5e3");

      const data: Data[] = await response.json();
      console.log(data);
      setUserData(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {userData.map((data) => (
        <div key={data._id}>
          <p>{data.category} : {data.description} : {data.method} : {data.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchUserData;
