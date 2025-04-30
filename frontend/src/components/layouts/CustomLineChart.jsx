import React from 'react';
import {
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;


// import React from 'react';
// import {
//   YAxis,
//   XAxis,
//    Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Area,
//   AreaChart,
// } from 'recharts';

// const CustomLineChart = () => {
//   const data = [
//     { month: 'Jan', amount: 400, category: 'Sales' },
//     { month: 'Feb', amount: 300, category: 'Sales' },
//     { month: 'Mar', amount: 500, category: 'Sales' },
//   ];

//   const CustomToolTip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px', padding: '8px', border: '1px solid #ccc' }}>
//           <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#875cf5', marginBottom: '4px' }}>
//             {payload[0].payload.category}
//           </p>
//           <p style={{ fontSize: '14px', color: '#666' }}>
//             Amount: <span style={{ fontWeight: 'medium', color: '#333' }}>${payload[0].payload.amount}</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div style={{ backgroundColor: 'white', minHeight: '300px', width: '100%', maxWidth: '600px' }}>
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
//               <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid stroke="none" />
//           <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
//           <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
//           <Tooltip content={<CustomToolTip />} />
//           <Area
//             type="monotone"
//             dataKey="amount"
//             stroke="#875cf5"
//             fill="url(#incomeGradient)"
//             strokeWidth={3}
//             dot={{ r: 3, fill: "#ab8df8" }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomLineChart;