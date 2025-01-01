import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0ea5e9', '#14b8a6', '#f59e0b', '#6366f1', '#ec4899'];

interface PieChartProps {
  data: Array<{
    country: string;
    share: number;
  }>;
  nameKey?: string;
  valueKey?: string;
}

export function PieChart({ data, nameKey = 'country', valueKey = 'share' }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey={valueKey}
          nameKey={nameKey}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {data[nameKey]}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {(data[valueKey] * 100).toFixed(1)}%
                      </span>
                    </div>
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
