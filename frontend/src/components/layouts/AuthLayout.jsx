import React from 'react'
import card2 from"../../assets/images/card2.png"
import { LuTrendingDown } from 'react-icons/lu'

const AuthLayout = ({children}) => {
  return (
    <div className='flex '>
        <div className="w-screen h-screen md-w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-lg font-medium">Expense Tracker</h2>
            {children}
        </div>

        <div className=" md:block  lg:w-[70vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
            <div className="w-68 h-48 rounded-[60px] bg-purple-600 absolute -top-7 -left-5"/>
            <div className="w-48 h-56 border-[20px] border-fuchsia-600 absolute top-[20%] right-10  rounded-[50px] bg-purple-700 sm:mt-[50px] "/>
            <div className="w-48 h-48  rounded-[40px] bg-violet-500 absolute -bottom-7  -left-5"/>

            <div className="grid grid-cols-1 x-20">
                <StatInfoCard
                    icon={<LuTrendingDown/>}
                        label= "Track your Income $ expense"
                        value="430,000"
                        color="bg-primary"
                    />
            </div>

            <img src={card2} alt="img"  className='w-64 lg:w[90%] absolute bottom-10 shadow-lg shadow-blue-400/15'/>
        </div>
    </div>
  )
}

export default AuthLayout


const StatInfoCard =({icon,value,label,color})=>{
    return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10  border border-gray-200/50 z-10">
        <div className={`w-12 h-12 flex items-center justify-center text[26px] text-white ${color} rounded-full drop-shadow-xl`}>{icon}</div>
        <div >
            <h6 className='text-xs text-gray-500 mb-1 '>{label}</h6>
            <span className='text-[20px]'>${value}</span>
        </div>
        
        

        

        
    </div>

    
}