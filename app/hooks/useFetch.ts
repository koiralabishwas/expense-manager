import { useState, useEffect } from "react";

interface UserData {
  _id : string
  name : string
  email : string
  password : string
  createdAt : string
  transactions : Transactions
}

interface Transactions{
  [key : string] : TransactionDetails[]
}

interface TransactionDetails {
  id : string
  type : string
  category : string
  description : string
  method : string
  amount : number
  at : string
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<UserData[]>();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        setData(parsedData);
        setError(null);
      } catch {
        setError(`${error} could not fetch data`);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, isloading, error };
};
