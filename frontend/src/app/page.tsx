"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import { fetchBasinsGeoJSON, fetchBasins, fetchBasinDetail, fetchTrends } from "@/lib/api";

const BasinMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#030712]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38BDF8]"></div>
    </div>
  ),
});

export default function Home() {
  const [geoData, setGeoData] = useState<any>(null);
  const [basins, setBasins] = useState<any[]>([]);
  const [selectedBasinIds, setSelectedBasinIds] = useState<string[]>([]);
  const [basinDetails, setBasinDetails] = useState<any[]>([]);
  const [regionalTrends, setRegionalTrends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<string>("All");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [geo, list, trendsRes] = await Promise.all([
          fetchBasinsGeoJSON(),
          fetchBasins(),
          fetchTrends()
        ]);
        setGeoData(geo);
        setBasins(list);
        setRegionalTrends(trendsRes.trends || []);
      } catch (e) {
        console.error("Error loading data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (selectedBasinIds.length === 0) {
        setBasinDetails([]);
        return;
      }
      
      try {
        const details = await Promise.all(
          selectedBasinIds.map(id => fetchBasinDetail(id))
        );
        setBasinDetails(details);
      } catch (e) {
        console.error("Error fetching basin details", e);
      }
    };
    
    loadDetails();
  }, [selectedBasinIds]);

  const handleSelectBasin = (id: string | null) => {
    if (!id) return;
    
    setSelectedBasinIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(bid => bid !== id); // deselect
      }
      if (prev.length >= 3) {
        // limit to 3 basins
        return [prev[1], prev[2], id]; // drop oldest, keep 3
      }
      return [...prev, id];
    });
  };

  const filteredGeoData = geoData ? {
    ...geoData,
    features: geoData.features.filter((f: any) => {
      if (filterRisk === "All") return true;
      const b = basins.find(b => b.id === f.properties.id);
      return b?.risk_level === filterRisk;
    })
  } : null;

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#030712]">
      <div className="w-[70%] h-full relative">
        <BasinMap 
          geoData={filteredGeoData} 
          selectedBasinIds={selectedBasinIds}
          onSelectBasin={handleSelectBasin}
          basins={basins}
        />
      </div>
      <div className="w-[30%] h-full border-l border-[#1F2937] bg-[#0B1117] overflow-y-auto">
        <Sidebar 
          basinDetails={basinDetails}
          regionalTrends={regionalTrends}
          isLoading={isLoading} 
          filterRisk={filterRisk}
          setFilterRisk={setFilterRisk}
        />
      </div>
    </main>
  );
}
