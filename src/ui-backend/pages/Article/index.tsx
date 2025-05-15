import { getTestAPI } from "@/ui-backend/apis/test";
import { useState, useEffect } from "react";

export const Article = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestAPI();
      setData(JSON.stringify(res.data));
    };
    fetchData();
  }, []);

  return <div>{data}</div>;
};
