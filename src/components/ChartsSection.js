"use client";
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

export default function ChartsSection({ rows }) {

    const revenueByProduct = {};
    rows.forEach(r => {
        if (!r.product) return;
        revenueByProduct[r.product] =
            (revenueByProduct[r.product] || 0) + Number(r.revenue || 0);
    });

    const barData = Object.keys(revenueByProduct)
        .map(product => ({
            product,
            revenue: revenueByProduct[product]
        }))
        .sort((a, b) => b.revenue - a.revenue);

    const revenueByMonth = {};
    rows.forEach(r => {
        const month = r.date.slice(0, 7);
        revenueByMonth[month] =
            (revenueByMonth[month] || 0) + Number(r.revenue);
    });

    const lineData = Object.keys(revenueByMonth).map(month => ({
        month,
        revenue: revenueByMonth[month]
    }));

    return (
        <div className="p-6 space-y-10">

            <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Revenue by Product</h2>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={barData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >
                        <XAxis
                            dataKey="product"
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                            height={60}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            tickFormatter={(value) =>
                                `$${(value / 1000).toFixed(0)}k`
                            }
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value) =>
                                `$${value.toLocaleString()}`
                            }
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#2563eb"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Monthly Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#16a34a" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}