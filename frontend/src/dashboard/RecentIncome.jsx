import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from '../components/layouts/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold">Recent Income</h5>

        <button className="card-btn flex items-center gap-2" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {transactions?.length ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source || 'Unknown'}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={Number(item.amount) || 0}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-sm text-gray-400 text-center mt-4">
            No recent income transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
