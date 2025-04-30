
import React from 'react';

const CustomToolTip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const { name, value } = payload[0];

  return (
    <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300">
      <p className="text-xs font-semibold text-purple-800 mb-1">{name}</p>
      <p className="text-sm text-gray-600">
        Amount:{' '}
        <span className="text-sm font-medium text-gray-900">
          ${value}
        </span>
      </p>
    </div>
  );
};

export default CustomToolTip;
