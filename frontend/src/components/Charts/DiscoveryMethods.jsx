import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DiscoveryMethods({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="method" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#8B5CF6"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DiscoveryMethods;