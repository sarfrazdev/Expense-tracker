import React from 'react'

const InfoCard = ({icon ,label ,color, value}) => {
  return (
<div className="flex gap-10 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 p-5">
    <div className={`w-14 h-14 flex items-center justify-center text-[126px] text-white ${color} rounded-full drop-shadow-xl p-5`}>
        {icon}
    </div>
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="text-[22px]">{value}</div>
</div>
  )
}

export default InfoCard