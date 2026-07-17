import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function TopHostStars({ data }) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 60,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" />

        <YAxis
          type="category"
          dataKey="star"
          width={120}
        />

        <Tooltip />

        <Bar
          dataKey="planets"
          fill="#8B5CF6"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopHostStars;