import Income from "../models/income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId,Types } from "mongoose";



export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get current date and calculate date ranges
    const currentDate = new Date();
    const sixtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 60));
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

    // Fetch all data in parallel
    const [incomeData, expenseData, recentIncome, recentExpense] = await Promise.all([
      Income.aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Income.find({ userId, date: { $gte: sixtyDaysAgo } })
        .sort({ date: -1 })
        .limit(5),
      Expense.find({ userId, date: { $gte: thirtyDaysAgo } })
        .sort({ date: -1 })
        .limit(5)
    ]);

    // Process results
    const totalIncome = incomeData[0]?.total || 0;
    const totalExpense = expenseData[0]?.total || 0;
    const balance = totalIncome - totalExpense;

    // Format response
    res.status(200).json({
      totalBalance: balance,
      totalIncome,
      totalExpense,
      last60DaysIncome: {
        transactions: recentIncome.map(i => ({
          ...i.toObject(),
          type: 'income'
        }))
      },
      last30DaysExpense: {
        transactions: recentExpense.map(e => ({
          ...e.toObject(),
          type: 'expense'
        }))
      },
      recentTransactions: [
        ...recentIncome.map(i => ({...i.toObject(), type: 'income'})),
        ...recentExpense.map(e => ({...e.toObject(), type: 'expense'}))
      ].sort((a, b) => b.date - a.date).slice(0, 5)
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};