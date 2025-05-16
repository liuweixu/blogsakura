import { getTestAPI } from "@/ui-backend/apis/test";
import { userTestAPI } from "@/ui-backend/apis/test";
import { userTestPostAPI } from "@/ui-backend/apis/test";
import { useState, useEffect } from "react";

export const Article = () => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [test, setTest] = useState("");
  const formData = {
    mobile: "12345678901",
    code: "123456",
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestAPI();
      setData(JSON.stringify(res.data));
      const res2 = await userTestAPI();
      setUser(JSON.stringify(res2.data));
      const res3 = await userTestPostAPI(formData);
      setTest(JSON.stringify(res3.data));
    };
    fetchData();
  }, []);

  return (
    <div>
      {data}
      <br />
      {user}
      <br />
      {test}
    </div>
  );
};
