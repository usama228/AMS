import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChart = ({ data, height, color }) => {
  return (
    <RechartsPieChart width={500} height={height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill={color[0]}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={color[index % color.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </RechartsPieChart>
  );
};

export default PieChart;
