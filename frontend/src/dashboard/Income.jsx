import React, { useEffect, useState } from 'react'
import DashboardLayouts from '../components/layouts/DashboardLayouts'
import IncomeOverview from "../components/layouts/IncomeOverview"
import axiosInstance from '../utils/axiosInstance'
import { API_PATH } from '../utils/apiPath'
import AddIncomeForm from "./AddIncomeForm " 
import Modal from '../components/layouts/Modal'
import { toast } from 'react-hot-toast'
import IncomeList from './IncomeList'
import DeleteAlert from "../components/layouts/DeleteAlert"


const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      toast.error('Failed to fetch income details');
    } finally {
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = async (formData) => {
    try {
      const response = await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, formData);
      if (response.data) {
        await fetchIncomeDetails();
        setOpenAddIncomeModal(false);
        toast.success('Income added successfully!');
      }
    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income');
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      const response = await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id));
      if (response.data) {
        await fetchIncomeDetails();
        setOpenDeleteAlert({ show: false, data: null });
        toast.success('Income deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
    }
  };

  // Handle download income


  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
  
      // Create download link
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.hidden = true;
      link.download = `Income_${Date.now()}.xlsx`;
      link.href = downloadUrl;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      link.remove();
  
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      // Handle JSON error responses
      if (error.response?.data?.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          const errData = JSON.parse(reader.result);
          toast.error(errData.message || 'Download failed');
        };
        reader.readAsText(error.response.data);
      } else {
        toast.error('Failed to download file');
      }
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayouts activeMenu="Income">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              incomeData={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

      
          <IncomeList
              transactions={incomeData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false,data:null})}
          title="Delete Income"
        >
        <DeleteAlert
          content="Are you sure you want to delete  this income"
          onDelete={(()=>deleteIncome(openDeleteAlert.data))}
        />
        </Modal>
      </div>
    </DashboardLayouts>
  );
};

export default Income;
