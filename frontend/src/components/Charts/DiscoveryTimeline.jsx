import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DiscoveryTimeline({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="year" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="planets"
          stroke="#3B82F6"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DiscoveryTimeline;