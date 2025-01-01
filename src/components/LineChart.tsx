import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartProps {
  data: Array<{
    date: string;
    visits: number;
  }>;
  xKey?: string;
  yKey?: string;
  title?: string;
}

export function LineChart({ data, xKey = 'date', yKey = 'visits', title }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis 
          dataKey={xKey}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {title || "Visits"}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ fill: "#0ea5e9" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
