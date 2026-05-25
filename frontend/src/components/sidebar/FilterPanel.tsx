"use client";

export default function FilterPanel({ filterRisk, setFilterRisk }: { filterRisk: string, setFilterRisk: (r: string) => void }) {
  const risks = ["All", "Moderate", "Critical", "Extreme"];

  return (
    <div className="mb-6">
      <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-3 font-semibold">Risk Filters</h3>
      <div className="flex flex-wrap gap-2">
        {risks.map(r => (
          <button
            key={r}
            onClick={() => setFilterRisk(r)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-300 ${
              filterRisk === r 
                ? 'bg-[#1F2937] border-[#38BDF8] text-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.2)]' 
                : 'bg-[#030712] border-[#1F2937] text-gray-400 hover:border-gray-500'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
