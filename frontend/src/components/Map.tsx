"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BasinMapProps {
  geoData: any;
  selectedBasinIds: string[];
  onSelectBasin: (id: string | null) => void;
  basins: any[];
}

function MapUpdater({ geoData }: { geoData: any }) {
  const map = useMap();
  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const bounds = L.geoJSON(geoData).getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [geoData, map]);
  return null;
}

export default function BasinMap({ geoData, selectedBasinIds, onSelectBasin, basins }: BasinMapProps) {
  
  // Define distinct colors for up to 3 selected basins: Cyan, Indigo, Rose
  const selectionColors = ["#38BDF8", "#818CF8", "#f43f5e"];

  const getStyle = (feature: any) => {
    const basinId = feature.properties.id;
    const isSelected = selectedBasinIds.includes(basinId);
    const selectionIndex = selectedBasinIds.indexOf(basinId);
    
    const basin = basins.find(b => b.id === basinId);
    
    // Default color logic if not selected
    let baseColor = "#4b5563"; // gray-600
    if (!isSelected) {
      if (basin?.risk_level === "Critical" || basin?.risk_level === "Extreme") baseColor = "#9f1239"; // dark rose
      else if (basin?.risk_level === "Moderate") baseColor = "#92400e"; // dark amber
      else baseColor = "#065f46"; // dark emerald
    }
    
    const activeColor = isSelected ? selectionColors[selectionIndex] : baseColor;

    return {
      fillColor: activeColor,
      weight: isSelected ? 3 : 1,
      opacity: 1,
      color: isSelected ? activeColor : "#1F2937",
      fillOpacity: isSelected ? 0.7 : 0.4
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const basin = basins.find(b => b.id === feature.properties.id);
    const isSelected = selectedBasinIds.includes(feature.properties.id);
    
    if (basin) {
      const tooltipContent = `
        <div class="p-2 bg-[#0B1117] border border-[#1F2937] text-white rounded shadow-lg text-sm">
          <strong class="text-[#38BDF8] block mb-1">${basin.name}</strong>
          <div>Risk: ${basin.risk_level}</div>
          <div>Water Stress: ${basin.water_stress_score}</div>
          <div>Pop Exposure: ${(basin.population_exposure / 1000000).toFixed(1)}M</div>
          ${isSelected ? '<div class="text-[#818CF8] mt-1 text-xs italic">Selected</div>' : '<div class="text-gray-400 mt-1 text-xs italic">Click to select (max 3)</div>'}
        </div>
      `;
      layer.bindTooltip(tooltipContent, { sticky: true, className: 'custom-tooltip' });
    }

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.9,
          weight: 2
        });
        layer.bringToFront();
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle(getStyle(feature));
      },
      click: () => {
        onSelectBasin(feature.properties.id);
      }
    });
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "100%", width: "100%", background: "#030712" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData && (
          <GeoJSON
            key={JSON.stringify(geoData) + JSON.stringify(selectedBasinIds)} 
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
        <MapUpdater geoData={geoData} />
      </MapContainer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-tooltip.custom-tooltip {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        .leaflet-tooltip-left.custom-tooltip::before { border-left-color: #1F2937; }
        .leaflet-tooltip-right.custom-tooltip::before { border-right-color: #1F2937; }
      `}} />
    </div>
  );
}
