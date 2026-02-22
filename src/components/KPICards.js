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
                <div key={i} className="bg-white shadow p-5 rounded">
                    <p className="text-black font-bold text-xl">{card.title}:</p>
                    <h2 className="text-lg font-medium mt-2">{card.value}</h2>
                </div>
            ))}


        </div>
    )
}