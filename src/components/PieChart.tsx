import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Updated color palette with more professional and visually appealing colors
const COLORS = [
  '#2563eb', // Blue
  '#16a34a', // Green
  '#ea580c', // Orange
  '#7c3aed', // Purple
  '#db2777', // Pink
  '#0891b2', // Cyan
  '#ca8a04', // Yellow
];

interface PieChartProps {
  data: Array<{
    country: string;
    share: number;
  }>;
  nameKey?: string;
  valueKey?: string;
}

export function PieChart({ data, nameKey = 'country', valueKey = 'share' }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={4}
          dataKey={valueKey}
          nameKey={nameKey}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const percent = (value / total) * 100;
            
            return percent > 5 ? (
              <text
                x={x}
                y={y}
                className="text-xs"
                fill="#888888"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {`${data[index][nameKey]} (${percent.toFixed(1)}%)`}
              </text>
            ) : null;
          }}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-3 shadow-md">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {data[nameKey]}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(data[valueKey] * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of total traffic
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
