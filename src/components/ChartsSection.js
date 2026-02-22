"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Sector,
} from "recharts";

export default function ChartsSection({ rows }) {

    const revenueByProduct = {};
    rows.forEach((r) => {
        if (!r.product) return;
        revenueByProduct[r.product] =
            (revenueByProduct[r.product] || 0) + Number(r.revenue || 0);
    });

    const barData = Object.keys(revenueByProduct)
        .map((product) => ({
            product,
            revenue: revenueByProduct[product],
        }))
        .sort((a, b) => b.revenue - a.revenue);


    const revenueByMonth = {};
    rows.forEach((r) => {
        if (!r.date) return;
        const month = r.date.slice(0, 7);
        revenueByMonth[month] =
            (revenueByMonth[month] || 0) + Number(r.revenue || 0);
    });

    const lineData = Object.keys(revenueByMonth)
        .sort()
        .map((month) => ({
            month,
            revenue: revenueByMonth[month],
        }));


    const revenueByRegion = {};
    rows.forEach((r) => {
        if (!r.region) return;
        revenueByRegion[r.region] =
            (revenueByRegion[r.region] || 0) + Number(r.revenue || 0);
    });

    const pieData = Object.keys(revenueByRegion).map((region) => ({
        name: region,
        value: revenueByRegion[region],
    }));

    const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

    return (
        <div className="space-y-10 mt-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Revenue by Product
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="product" angle={-30} textAnchor="end" interval={0} height={60} />
                            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Monthly Revenue Trend
                    </h2>

                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#16a34a"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Revenue by Region
                </h2>

                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={4}
                            label={({ percent }) =>
                                `${(percent * 100).toFixed(0)}%`
                            }
                            shape={(props) => {
                                const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];
                                const { index } = props;

                                return (
                                    <Sector
                                        {...props}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                );
                            }}
                        />
                        <Tooltip
                            formatter={(v) => `$${Number(v).toLocaleString()}`}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}