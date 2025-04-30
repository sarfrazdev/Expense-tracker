import React, { useState } from 'react';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: ''
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.category && expense.amount && expense.date) {
        onAddExpense({
            ...expense,
            date: new Date(expense.date).toISOString() // Proper date formatting
        });
        setExpense({ category: '', amount: '', date: '', icon: '' });
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => setExpense({ ...expense, icon: selectedIcon })}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={expense.category}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
