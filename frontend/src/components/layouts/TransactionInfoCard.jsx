import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {

  const getAmountStyles = () => {
    return type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
  };

  return (
    <div className="flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 w-full sm:w-[750px] md:w-full shadow-xl">
      
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full">
        {icon ? (
          <span className="text-2xl">{icon}</span>   
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-gray-700">{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 transition"
              onClick={onDelete}
            >
              <LuTrash2 />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-bold">
              {type === "income" ? "+" : "-"}₹{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TransactionInfoCard;




