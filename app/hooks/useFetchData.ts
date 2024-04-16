import { useState, useEffect } from "react";

// TODO:make error handelong [error, setErrors]
const useFetch = (url : string) => {
  const [data, setData] = useState(null);
  const [isloading , setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await fetch(url)
      const parsedData = await  response.json()
      setData(parsedData)
    }
    fetchData()
    setIsLoading(false)
  }, [url]);

  return {data , isloading}
};