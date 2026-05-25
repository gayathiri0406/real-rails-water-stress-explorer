import { Info } from "lucide-react";

export default function WhyThisMatters() {
  return (
    <div className="mb-6 glass-panel rounded-lg p-4 border-l-2 border-l-[#38BDF8]">
      <h3 className="text-[#38BDF8] text-xs uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
        <Info size={14} />
        Why This Matters
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed italic">
        "Good systems-thinking demo connecting resources to economic resilience."
      </p>
    </div>
  );
}
