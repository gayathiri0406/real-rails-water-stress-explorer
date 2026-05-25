import { AlertTriangle, BarChart2 } from "lucide-react";

interface ComparisonPanelProps {
  basinDetails: any[];
  regionalTrends: any[];
}

export default function ComparisonPanel({ basinDetails, regionalTrends }: ComparisonPanelProps) {
  if (basinDetails.length < 2) return null;

  const currentYear = 2023;
  const regionalAvgCurrent = regionalTrends.find(t => t.year === currentYear)?.average_stress_level || 0;

  const getInsights = () => {
    const insights = [];
    
    // Insight: X% above regional stress average
    basinDetails.forEach(basin => {
      if (basin.water_stress_score > regionalAvgCurrent) {
        const diff = basin.water_stress_score - regionalAvgCurrent;
        const pct = ((diff / regionalAvgCurrent) * 100).toFixed(0);
        insights.push(`${basin.name} is ${pct}% above regional stress average.`);
      } else {
         const diff = regionalAvgCurrent - basin.water_stress_score;
         const pct = ((diff / regionalAvgCurrent) * 100).toFixed(0);
         insights.push(`${basin.name} is ${pct}% below regional stress average.`);
      }
    });

    // Insight: Fastest exposure growth
    let maxGrowth = -1;
    let maxGrowthBasin = "";
    basinDetails.forEach(basin => {
      const earliest = basin.trends[0].population_exposure;
      const latest = basin.trends[basin.trends.length - 1].population_exposure;
      const growth = ((latest - earliest) / earliest) * 100;
      if (growth > maxGrowth) {
        maxGrowth = growth;
        maxGrowthBasin = basin.name;
      }
    });
    if (maxGrowthBasin) {
      insights.push(`${maxGrowthBasin} is the fastest exposure growth basin.`);
    }

    return insights;
  };

  const colors = ["text-[#38BDF8]", "text-[#818CF8]", "text-[#f43f5e]"];

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#f8fafc] mb-1 flex items-center gap-2">
          <BarChart2 className="text-[#818CF8]" size={20} />
          Multi-Basin Comparison
        </h2>
        <p className="text-gray-400 text-sm">Comparing {basinDetails.length} basins</p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {basinDetails.map((basin, idx) => (
           <div key={basin.id} className="bg-[#030712] p-3 rounded-lg border border-[#1F2937] flex justify-between items-center">
             <div>
               <div className={`font-semibold ${colors[idx]} text-sm`}>{basin.name}</div>
               <div className="text-gray-400 text-xs mt-1">Water Stress: <span className="text-[#f8fafc]">{basin.water_stress_score.toFixed(1)}</span></div>
             </div>
             <div className="text-right">
               <div className="text-gray-400 text-xs">Pop. Exp: <span className="text-[#f8fafc]">{(basin.population_exposure / 1000000).toFixed(1)}M</span></div>
               <div className="text-gray-400 text-xs mt-1">Risk: <span className="text-[#f8fafc]">{basin.risk_level}</span></div>
             </div>
           </div>
        ))}
      </div>

      <div className="mb-2">
        <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-3 font-semibold flex items-center gap-2">
          <AlertTriangle size={14} />
          Comparative Insights
        </h3>
        <ul className="space-y-2">
          {getInsights().map((insight: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 bg-[#030712] p-2 rounded border-l-2 border-l-[#818CF8]">
              <span className="text-[#818CF8] mt-0.5">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
