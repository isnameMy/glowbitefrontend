import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TempChart.css';

export default function TempChart({ data, realIgnition }) {
  // Подготавливаем данные для графика
  const chartData = data.map(item => ({
    date: item.date instanceof Date 
      ? item.date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
      : item.date,
    temperature: item.temp,
    isIgnitionPoint: realIgnition 
      ? item.date instanceof Date 
        ? item.date.getTime() === new Date(realIgnition.date).setHours(0,0,0,0)
        : false
      : false,
  }));

  return (
    <div className="temp-chart">
      <div className="temp-chart__header">
        <h3 className="temp-chart__title">📈 Температура штабеля</h3>
      </div>
      <div className="temp-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              label={{ 
                value: 'Температура, °C', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#64748b',
                fontSize: 12,
              }}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip
              formatter={(value) => [`${value} °C`, 'Температура']}
              labelFormatter={(label) => `Дата: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontSize: '14px',
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ 
                r: 4,
                fill: "#ef4444",
                stroke: "#ef4444",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}