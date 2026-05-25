import { TrendingUp, AlertTriangle, Droplets, Factory, Users } from "lucide-react";

export default function MetricsPanel({ basin }: { basin: any }) {
  if (!basin) return null;

  const getRiskColor = (risk: string) => {
    if (risk === "Critical" || risk === "Extreme") return "text-rose-400";
    if (risk === "Moderate") return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#f8fafc] mb-1">{basin.name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Status:</span>
          <span className={`text-sm font-semibold uppercase tracking-wider ${getRiskColor(basin.risk_level)}`}>
            {basin.risk_level} Risk
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#030712] p-3 rounded-lg border border-[#1F2937]">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Droplets size={14} className="text-[#38BDF8]" />
            Water Stress
          </div>
          <div className="text-xl font-bold text-[#f8fafc]">{basin.water_stress_score.toFixed(1)}</div>
        </div>
        <div className="bg-[#030712] p-3 rounded-lg border border-[#1F2937]">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Users size={14} className="text-[#818CF8]" />
            Pop. Exposure
          </div>
          <div className="text-xl font-bold text-[#f8fafc]">{(basin.population_exposure / 1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-[#030712] p-3 rounded-lg border border-[#1F2937]">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <TrendingUp size={14} className="text-[#38BDF8]" />
            Agri. Dependency
          </div>
          <div className="text-xl font-bold text-[#f8fafc]">{basin.agricultural_dependency}%</div>
        </div>
        <div className="bg-[#030712] p-3 rounded-lg border border-[#1F2937]">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Factory size={14} className="text-[#818CF8]" />
            Ind. Concentration
          </div>
          <div className="text-xl font-bold text-[#f8fafc]">{basin.industrial_concentration}%</div>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-3 font-semibold flex items-center gap-2">
          <AlertTriangle size={14} />
          Intelligence Insights
        </h3>
        <ul className="space-y-2">
          {basin.insights?.map((insight: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 bg-[#030712] p-2 rounded border-l-2 border-l-[#38BDF8]">
              <span className="text-[#38BDF8] mt-0.5">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
