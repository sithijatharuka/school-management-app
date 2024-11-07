"use client";
import Image from "next/image";
import styles from "./Gender.module.css";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 128,
    pv: 2400,
    fill: "white",
  },
  {
    name: "Girls",
    count: 78,
    pv: 2400,
    fill: "#f9e181",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#c5ecf9",
  },
];

const GenderBox = () => {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* <Image src="/maleFemale.png" alt="" width={50} height={50} /> */}
    </div>
  );
};

export default GenderBox;
