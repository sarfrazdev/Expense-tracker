import Expense from "../models/Expense.js";
import XLSX from 'xlsx';



//add Expense source
// Fix field name mismatch in addExpense
export const addExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, category, amount, date } = req.body; // Changed from 'data' to 'date'

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date), // Match frontend field name
        });
        
        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully" });
    } catch (error) {
        console.error("Add expense error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fix download mapping in downloadExpenseExcel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        const data = expense.map((item) => ({
            Category: item.category, // Changed from 'Source' to 'Category'
            Amount: item.amount,
            Date: item.date
        }));
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Expense');
        
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Expenses.xlsx');
        res.send(buffer);
        
    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//get all Expense source
export const getAllExpense=async (req, res) => {
    const userId = req.user._id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.status(200).json(expense);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }   
} 


//delete Expense source
export const deleteExpense=async (req, res) => {

    try{
     await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Expense source deleted successfully"})   
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}



