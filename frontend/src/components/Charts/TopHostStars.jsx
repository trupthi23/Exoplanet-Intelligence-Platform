import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TopHostStars({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="star" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="planets"
          fill="#10B981"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopHostStars;