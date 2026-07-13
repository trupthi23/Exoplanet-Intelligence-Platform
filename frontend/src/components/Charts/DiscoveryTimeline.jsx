import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DiscoveryTimeline({ data }) {

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
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default DiscoveryTimeline;