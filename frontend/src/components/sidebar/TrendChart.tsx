"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface TrendChartProps {
  data: any[];
  title: string;
}

export default function TrendChart({ data, title }: TrendChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-6 glass-panel rounded-lg p-4">
      <h3 className="text-[#818CF8] text-xs uppercase tracking-wider mb-4 font-semibold">{title}</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
              itemStyle={{ color: '#38BDF8' }}
              labelStyle={{ color: '#818CF8', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="stress_level" 
              stroke="#38BDF8" 
              strokeWidth={2}
              dot={{ r: 3, fill: "#030712", stroke: "#38BDF8", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#38BDF8" }}
              name="Stress Level"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
