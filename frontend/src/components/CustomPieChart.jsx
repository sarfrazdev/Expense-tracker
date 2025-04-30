import React from 'react';
import CustomToolTip from './CustomToolTip';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import CustomLegend from "./CustomLegend"

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          labelLine={false}
          label={label}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip  content={<CustomToolTip/>}/>
        <Legend  content={<CustomLegend/>}/>
          {showTextAnchor &&(
            <>
            <text
            x="50%"
            y="50%"
            dy={8}
            textAnchor='middle'
            fill="#666"
            fontSize={"14px"}
            >
                {label}
            </text>
            <text
            x="50%"
            y="50%"
            dy={-10} 
            textAnchor='middle'
            fill="#333"
            fontSize="24px"
            fontWeight="600" 
          >
            {totalAmount}
          </text>
            </>
          )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
