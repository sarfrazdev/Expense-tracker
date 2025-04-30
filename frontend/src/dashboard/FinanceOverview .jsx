import React, { useEffect, useState } from 'react';
import CustomPieChart from '../components/CustomPieChart';

const FinanceOverview = ({ totalIncome, totalExpense, totalBalance, incomeData }) => {
  const [chartData, setChartData] = useState([]);

  const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4F39F6'];

  useEffect(() => {
    const dataArr = Array.isArray(incomeData)
      ? incomeData.map((item) => ({
          name: item?.source || 'Unknown',
          amount: Number(item?.amount) || 0
        }))
      : [];

    setChartData(dataArr);
  }, [incomeData]);

  return (
    <div className="card">
      <h5 className="text-lg font-semibold mb-2">Finance Overview</h5>
      <p className="text-sm text-gray-400 mb-4">
        Overview of your financial status including income source distribution.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Financial Summary */}
        <div className="w-full md:w-1/2 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Income</span>
            <span className="font-semibold text-green-600">${totalIncome}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Expense</span>
            <span className="font-semibold text-red-500">${totalExpense}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Balance</span>
            <span className="font-semibold text-blue-600">${totalBalance}</span>
          </div>
        </div>

        {/* Pie Chart or Fallback */}
        <div className="w-full md:w-1/2">
          {chartData.length > 0 ? (
            <CustomPieChart
              data={chartData}
              label="Income"
              totalAmount={`$${totalIncome}`}
              showTextAnchor={true}
              colors={COLORS}
            />
          ) : (
            <div className="text-gray-400 text-sm text-center mt-10">
              No income data available for the selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
