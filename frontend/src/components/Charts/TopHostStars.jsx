import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function TopHostStars({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="star" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="planets" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopHostStars;