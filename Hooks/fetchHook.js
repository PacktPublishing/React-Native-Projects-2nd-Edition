import { useState, useEffect } from "react";

const requestOptions = {
  method: "GET"
};

export const useFetch = url => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setResponse(error);
      }
    };
    fetchData();
  }, [url]);
  return { response };
};
