import React,{useEffect, useState} from 'react'
import DashboardLayouts from '../components/layouts/DashboardLayouts'
import { useUserAuth } from '../hooks/UseUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import {  API_PATH } from '../utils/apiPath'
import InfoCard from '../components/layouts/InfoCard'
import {IoMdCard} from "react-icons/io" 
import { LuHandCoins ,LuWalletMinimal } from 'react-icons/lu'
import { addThousandsSeprator } from '../utils/helper'
import RecentTransactions from '../components/layouts/RecentTransactions'
import TransactionInfoCard from '../components/layouts/TransactionInfoCard'
import ExpenseTransactions from "../components/ExpenseTransactions";
import FinanceOverview from "./FinanceOverview";
import Last30DaysExpenses from "../components/Last30DaysExpenses";
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncome from "./RecentIncome";


const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashBoardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  const [totals, setTotals] = useState({
    balance: 0,
    income: 0,
    expense: 0
  });

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // useEffect(() => {
  //   // TEMP: mock dashboard data to test FinanceOverview and Pie Chart rendering
  //   setDashboardData({
  //     totalBalance: 5000,
  //     totalIncome: 7000,
  //     totalExpense: 2000,
  //     last60DaysIncome: {
  //       transactions: [
  //         { source: 'Job', amount: 3000 },
  //         { source: 'Freelance', amount: 4000 }
  //       ]
  //     },
  //     last30DaysExpense: {
  //       transactions: [
  //         { category: 'Rent', amount: 1500 },
  //         { category: 'Food', amount: 500 }
  //       ]
  //     }
  //   });
  // }, []);
  


  useEffect(() => {
    const incomeData = dashBoardData?.last60DaysIncome?.transactions || [];
    const expenseData = dashBoardData?.last30DaysExpense?.transactions || [];

    const newIncome = incomeData.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const newExpense = expenseData.reduce((acc, curr) => acc + Number(curr.amount), 0);

    setTotals({
      income: newIncome,
      expense: newExpense,
      balance: newIncome - newExpense
    });
  }, [dashBoardData]);

  return (
    <DashboardLayouts activeMenu="Dashboard">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeprator(dashBoardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeprator(dashBoardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeprator(dashBoardData?.totalExpense || 0)} // Fixed from totalExpenses
            color="bg-red-500"
          />
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col gap-6">
          {/* Transactions and Info */}
          <div className="w-full space-y-6">
            <RecentTransactions
              transactions={dashBoardData?.RecentTransactions}
              onSeeMore={() => navigate('/expense')}
            />
            <TransactionInfoCard />
          </div>

          {/* Finance Overview, Expenses */}
          <div className="w-full flex flex-col gap-6">
          <FinanceOverview
            totalBalance={totals.balance}
            totalIncome={totals.income}
            totalExpense={totals.expense}
            incomeData={dashBoardData?.last60DaysIncome?.transactions || []}
          />

            <div className="flex flex-col gap-6">
              <ExpenseTransactions
                transactions={dashBoardData?.last30DaysExpense?.transactions || []}
                onSeeMore={() => navigate('/expense')}
              />
              <Last30DaysExpenses
                data={dashBoardData?.last30DaysExpense?.transactions || []}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Income */}
        <div className="mt-10 flex flex-col gap-6">
          <RecentIncomeWithChart
            data={dashBoardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashBoardData?.totalIncome || 0}
          />
          <RecentIncome
            transactions={dashBoardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate('/income')}
          />
        </div>
      </div>
    </DashboardLayouts>
  );
};

export default Home;
