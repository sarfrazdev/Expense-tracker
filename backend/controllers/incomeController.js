import Income from "../models/income.js";
import XLSX from 'xlsx';



//add income source


export const addIncome = async (req, res) => {
    try {
      const { icon, source, amount, date } = req.body;
  
      if (!source || !amount || !date) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
  
      const newIncome = new Income({
         userId: req.user._id, // Uncomment this when user is authenticated
        icon,
        source,
        amount,
        date: new Date(date),
      });
  
      await newIncome.save();
      return res.status(201).json({ message: "Income source added successfully" });
  
    } catch (error) {
      console.error("Error in addIncome:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

//get all income source
export const getAllIncome=async (req, res) => {
    const userId = req.user._id;
    try{
        const income = await Income.find({userId}).sort({createdAt:-1});
        res.status(200).json(income);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }   
} 


//delete income source
export const deleteIncome=async (req, res) => {

    try{
     await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Income source deleted successfully"})   
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}



//download income source
// export const downloadIncomeExcel=async (req, res) => {
//     const userId = req.user._id;
//     try{
//         const income = await Income.find({userId}).sort({date:-1});
//         const data = income.map((item) => ({
//             Source: item.source,
//             Amount: item.amount,
//             Date: item.date
//         }));
//         const wb = XLSX.utils.book_new();
//         const ws = XLSX.utils.json_to_sheet(data);
//         XLSX.utils.book_append_sheet(wb, ws, 'Income');
//         XLSX.writeFile(wb, 'Income.xlsx');
//         res.download('Income.xlsx', (err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('Error downloading file');
//             } else {
//                 console.log('File downloaded successfully');
//             }
//         });
//     }
//     catch(error){
//         res.status(500).json({message:"Internal server error"})
//     }
// }

export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
      const income = await Income.find({ userId }).sort({ date: -1 });
      const data = income.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Date: item.date.toISOString().split('T')[0], // Format date
      }));
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Income');
      
      // Generate Excel buffer correctly
      const buffer = XLSX.write(wb, {
        type: 'array',
        bookType: 'xlsx',
      });
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=Income.xlsx');
      res.send(Buffer.from(buffer));
      
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };