export default function WhoControlsRail() {
  const controllers = [
    { category: "Institutional", name: "UN Water, World Bank" },
    { category: "Corporate", name: "Agricultural Conglomerates, Energy Sectors" },
    { category: "Market/Financial", name: "Water Rights Traders, ESG Funds" },
    { category: "Geopolitical", name: "Upstream/Downstream Nation States" }
  ];

  return (
    <div className="mb-6 glass-panel rounded-lg p-4">
      <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-4 font-semibold">Who Controls The Rail</h3>
      <div className="space-y-3">
        {controllers.map((c, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-gray-400 text-xs">{c.category} Controllers</span>
            <span className="text-[#f8fafc] text-sm font-medium">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
