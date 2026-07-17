import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DiscoveryTimeline({ data = [] }) {

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No discovery timeline data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
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
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DiscoveryTimeline;