import React, { useState, useEffect } from 'react';
import DashboardLayouts from '../components/layouts/DashboardLayouts';
import ExpenseOverview from '../components/expense/ExpenseOverview';
import Modal from '../components/layouts/Modal';
import AddExpenseForm from '../components/expense/AddExpenseForm';
import ExpenseList from '../components/expense/ExpenseList';
import DeleteAlert from '../components/layouts/DeleteAlert';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expense details
  const fetchExpenseDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
      toast.error('Failed to fetch expense details');
    } finally {
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (formData) => {
    try {
      const response = await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, formData);
      if (response.data) {
        await fetchExpenseDetails();
        setOpenAddExpenseModal(false);
        toast.success('Expense added successfully!');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error(error.response?.data?.message || 'Failed to add expense');
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));
      if (response.data) {
        await fetchExpenseDetails();
        setOpenDeleteAlert({ show: false, data: null });
        toast.success('Expense deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  // Handle download expense
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
        headers: {
         // Authorization: `Bearer ${localStorage.getItem('token')}`,
         'cache-control':"no-cache"
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.hidden = true;
      link.href = url;
      link.download = `Expenses_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();

      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(error.response?.data?.message || 'Download failed');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayouts activeMenu="Expense">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayouts>
  );
};

export default Expense;
