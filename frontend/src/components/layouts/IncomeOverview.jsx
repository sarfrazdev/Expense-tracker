


import React, { useEffect, useState } from 'react';
import { prepareIncomeChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../CustomBarChart';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeOverview = ({ incomeData, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeChartData(incomeData);
    setChartData(result);
  }, [incomeData]);

  const COLORS = ['#875cf5', '#cfbefb', '#facc15', '#34d399', '#f472b6', '#60a5fa'];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trend
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add income
        </button>
      </div>

      {/* Bar and Pie charts */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <CustomBarChart data={chartData} />

        <div className="bg-white rounded-lg p-4 shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;
