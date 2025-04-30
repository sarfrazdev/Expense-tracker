import React, { useEffect, useState } from 'react'
import {prepareExpenseBarChartData} from "../utils/helper"
import CustomBarChart from "./CustomBarChart"
const Last30DaysExpenses = ({data}) => {
    
    const [chartData ,setChartdata]=useState([])

    useEffect(()=>{
        const result =prepareExpenseBarChartData(data)
        setChartdata(result)
        return()=>{}
    },[data])
    return (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-semibold text-gray-900">Last 30 Days Expenses</h5>
          </div>
          <div className="flex flex-col">
            <CustomBarChart data={chartData} />
          </div>
        </div>
      );
}

export default Last30DaysExpenses