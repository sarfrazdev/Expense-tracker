import React, { useState } from 'react';
import EmojiPickerPopup from "../components/layouts/EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income.source && income.amount && income.date) {
      onAddIncome(income); // ✅ send correct data
      setIncome({ source: '', amount: '', date: '', icon: '' }); // reset form
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => setIncome({ ...income, icon: selectedIcon })}
      />

      <input
        type="text"
        name="source"
        placeholder="Source"
        value={income.source}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={income.amount}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      {/* No need to show icon input separately — handled by EmojiPickerPopup */}

      <input
        type="date"
        name="date"
        value={income.date}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Income
      </button>
    </form>
  );
};

export default AddIncomeForm;
