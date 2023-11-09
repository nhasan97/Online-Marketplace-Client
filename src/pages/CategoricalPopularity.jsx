import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Title from "../reusableComponents/Title";

const CategoricalPopularity = () => {
  const title = "Category Wise Job Demand";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://b8-a11-online-marketplace-server.vercel.app/popularity`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    // <div className="max-w-screen-xl mx-auto px-20">

    // <div className="w-full min-h-screen flex flex-col justify-center items-center mt-24">
    //
    <div className="max-w-screen-xl mx-auto px-20 py-10 mt-16 ">
      <Helmet>
        <title>Work Line | Categorical Popularity</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Title title={title}></Title>
      <div className="py-10">
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={data} width={400} height={400}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#323384" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    // </div>
  );
};

export default CategoricalPopularity;
