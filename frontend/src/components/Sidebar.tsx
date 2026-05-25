import { Layers } from "lucide-react";
import FilterPanel from "./sidebar/FilterPanel";
import MetricsPanel from "./sidebar/MetricsPanel";
import WhyThisMatters from "./sidebar/WhyThisMatters";
import WhoControlsRail from "./sidebar/WhoControlsRail";
import DownloadData from "./sidebar/DownloadData";
import TrendChart from "./sidebar/TrendChart";
import ComparisonChart from "./sidebar/ComparisonChart";
import ComparisonPanel from "./sidebar/ComparisonPanel";

interface SidebarProps {
  basinDetails: any[];
  regionalTrends: any[];
  isLoading: boolean;
  filterRisk: string;
  setFilterRisk: (r: string) => void;
}

export default function Sidebar({ basinDetails, regionalTrends, isLoading, filterRisk, setFilterRisk }: SidebarProps) {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center gap-3 mb-8 border-b border-[#1F2937] pb-4">
        <div className="p-2 bg-[#030712] border border-[#1F2937] rounded-lg">
          <Layers className="text-[#38BDF8]" size={24} />
        </div>
        <div>
          <h1 className="text-[#f8fafc] font-bold text-lg tracking-tight">Real Rails</h1>
          <p className="text-[#818CF8] text-xs font-semibold uppercase tracking-widest">Intelligence Library</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#38BDF8]"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {basinDetails.length === 0 && <FilterPanel filterRisk={filterRisk} setFilterRisk={setFilterRisk} />}
          
          {basinDetails.length === 1 ? (
            <>
              <MetricsPanel basin={basinDetails[0]} />
              <TrendChart data={basinDetails[0].trends} title="Historical Water Stress Trend" />
            </>
          ) : basinDetails.length > 1 ? (
            <>
               <ComparisonPanel basinDetails={basinDetails} regionalTrends={regionalTrends} />
               <ComparisonChart basinDetails={basinDetails} regionalTrends={regionalTrends} />
            </>
          ) : (
            <div className="mb-6 p-4 rounded-lg border border-dashed border-[#1F2937] text-gray-500 text-sm text-center">
              Select up to 3 basins on the map to view comparative intelligence metrics and insights.
            </div>
          )}

          <WhyThisMatters />
          <WhoControlsRail />
          <DownloadData />
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #030712;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1F2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #38BDF8;
        }
      `}} />
    </div>
  );
}
