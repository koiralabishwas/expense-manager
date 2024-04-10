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
      const response = await fetch("api/v2/balance/660feb11f3723956e57ee2dc");

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
          
        </div>
      ))}
    </div>
  );
};

export default FetchUserData;
