export default function KPICards({ rows }) {
    const totalRevenue = rows.reduce((sum, r) => sum + Number(r.revenue), 0)
    const totalUnits = rows.reduce((sum, r) => sum + Number(r.units_sold), 0)
    const productRevenue = {}
    const regionRevenue = {}
    rows.forEach(r => {
        productRevenue[r.product] = (productRevenue[r.product] || 0) + Number(r.revenue)
        regionRevenue[r.product] = (regionRevenue[r.product] || 0) + Number(r.revenue)
    });

    const bestProduct = Object.keys(productRevenue).reduce((a, b) =>
        productRevenue[a] > productRevenue[b] ? a : b
    );

    const bestRegion = Object.keys(regionRevenue).reduce((a, b) =>
        regionRevenue[a] > regionRevenue[b] ? a : b
    );

    const cards = [
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
        { title: "Total Units Sold", value: `${totalUnits}` },
        { title: "Best Product", value: bestProduct },
        { title: "Best Region", value: bestRegion },
    ];

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 rounded-2xl border border-gray-100"
                >
                    <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                        {card.title}
                    </p>
                    <h2 className="text-2xl font-bold mt-3 text-gray-900">
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    )
}