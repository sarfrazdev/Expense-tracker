import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from './layouts/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold text-gray-900">Recent Expenses</h5>
        <button className="card-btn flex items-center gap-2" onClick={onSeeMore}>
          See All
          <LuArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {transactions?.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id} 
            title={expense.source} 
            icon={expense.icon}
            date={moment(expense.date).format('DD MMM YYYY')}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
