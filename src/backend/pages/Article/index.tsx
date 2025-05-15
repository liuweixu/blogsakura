import { getTestAPI } from "@/backend/apis/test";
import { useEffect, useState } from "react";

export const Article = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    getTestAPI().then((res) => {
      setData(res.data["mysql"]);
    });
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};
