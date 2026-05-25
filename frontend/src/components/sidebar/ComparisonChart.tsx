"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface ComparisonChartProps {
  basinDetails: any[];
  regionalTrends: any[];
}

export default function ComparisonChart({ basinDetails, regionalTrends }: ComparisonChartProps) {
  if (basinDetails.length < 2) return null;

  // Transform data for Recharts: array of objects { year: 2019, 'Basin A': 85.4, 'Basin B': 45.3, 'Regional Average': 60.1 }
  const years = basinDetails[0].trends.map((t: any) => t.year);
  const chartData = years.map((year: number) => {
    const dataPoint: any = { year };
    basinDetails.forEach((basin) => {
      const trendForYear = basin.trends.find((t: any) => t.year === year);
      if (trendForYear) {
        dataPoint[basin.name] = trendForYear.stress_level;
      }
    });
    const regionalTrendForYear = regionalTrends.find((t: any) => t.year === year);
    if (regionalTrendForYear) {
      dataPoint['Regional Avg'] = regionalTrendForYear.average_stress_level;
    }
    return dataPoint;
  });

  const colors = ["#38BDF8", "#818CF8", "#f43f5e"];

  return (
    <div className="mb-6 glass-panel rounded-lg p-4">
      <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-4 font-semibold">Comparative Stress Trends</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', color: '#f8fafc', fontSize: '12px' }}
              itemStyle={{ fontSize: '12px', padding: '2px 0' }}
              labelStyle={{ color: '#818CF8', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
            
            <Line 
              type="monotone" 
              dataKey="Regional Avg" 
              stroke="#9ca3af" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, fill: "#9ca3af" }}
            />
            
            {basinDetails.map((basin, idx) => (
              <Line 
                key={basin.id}
                type="monotone" 
                dataKey={basin.name}
                stroke={colors[idx]} 
                strokeWidth={2}
                dot={{ r: 3, fill: "#030712", stroke: colors[idx], strokeWidth: 2 }}
                activeDot={{ r: 5, fill: colors[idx] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
