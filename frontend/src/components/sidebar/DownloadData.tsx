"use client";

import { Download } from "lucide-react";

export default function DownloadData() {
  const handleDownload = () => {
    // Generate mock CSV data
    const csvContent = "data:text/csv;charset=utf-8,Basin ID,Name,Water Stress,Population Exposure\nB001,Colorado River Basin,85.4,40000000\nB002,Nile River Basin,92.1,280000000\nB003,Rhine River Basin,45.3,60000000";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "water_stress_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 border-t border-[#1F2937] pt-6 pb-4">
      <button 
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 bg-[#0B1117] hover:bg-[#1F2937] border border-[#1F2937] hover:border-[#38BDF8] text-[#38BDF8] transition-all duration-300 py-3 rounded-lg font-medium text-sm glow-primary"
      >
        <Download size={16} />
        Download Sample Data
      </button>
    </div>
  );
}
