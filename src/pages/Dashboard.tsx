import { useEffect, useState, type JSX } from "react";
import {
    LuHouse,
    LuWallet,
  LuChartNoAxesColumnIncreasing,
  LuLayoutGrid,
  LuHistory,
  LuUserRound,
  LuArrowDown,
  LuTrendingUp,
  LuTarget,
  LuChartNoAxesCombined,
  LuArrowRight,
  LuRocket,
  LuUtensils,
  LuCarFront,
  LuGamepad2,
  LuShoppingBag,
  LuPackage,
  LuReceiptText,
} from 'react-icons/lu';

import { api } from "../services/api";
import MonthYearSelect from '../components/MonthYearSelect';

const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);

    useEffect(() => {
        async function getTransactions() {
            const response = await api.get('/transactions')
        }

    getTransactions()
    }, [])

    interface transactionsMonth {
        icon: JSX.Element;
        title: string;
        moneyValue: string;
        desccription: string;
    }

    const transactions: ReadonlyArray<transactionsMonth> = [
        {
          icon: <LuWallet className="icon-dashboard-card text-primary-500" />,
          title: "Saldo Atual",
          moneyValue: 'R$ 1.435,00',
          desccription: "↑ +12,5% em relação ao mês anterior"
        },
        {
          icon: <LuArrowDown className="icon-dashboard-card text-red-600" />,
          title: "Despesas",
          moneyValue: 'R$ 2.435,00',
          desccription: "↑ +8,2% em relação ao mês anterior"

        },
        {
          icon: <LuTrendingUp className="icon-dashboard-card text-primary-700" />,
          title: "Receitas",
          moneyValue: 'R$ 1.000,00',
          desccription: "↑ +5,6% em relação ao mês anterior"
        },
        {
          icon: <LuTarget className="icon-dashboard-card text-[#00C9F2]" />,
          title: "Meta do Mês",
          moneyValue: 'RR$ 3.000,00',
          desccription: "48%"
            
        },
      ];

    return (
        <div>
            <main className="p-7 w-full">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-3xl ml-10 text-primary-600">Dash<span className="text-primary-500">Board</span></h2>
                        </div>
                        <div className="flex gap-1">
                            <MonthYearSelect year={year} month={month} onMonthChange={setMonth} onYearChange={setYear} />
                            <button className="bg-[#031727] rounded-full w-10 h-10 ml-5 flex justify-center items-center p-2.5 "><LuUserRound className="text-3xl" /></button>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-4 h-40 justify-center">
                        {transactions.map((transaction) => (
                        <div key={transaction.title} className="border-2 border-[#103249] rounded-2xl bg-[#031727] flex items-center justify-center w-full max-w-80">
                            <div className="mb-auto h-20">{transaction.icon}</div>
                            <div className="relative mr-9">
                                <h4 className="text-[#00C9F2]">{transaction.title}</h4>
                                <h2 className="my-2 text-xl">{transaction.moneyValue}</h2>
                                <p className="text-[11px] left-15 text-[#00C9F2]">{transaction.desccription}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="mt-10 flex gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="border-2 h-100 w-full max-w-210">
                            
                        </div>

                        <div className="border-2 h-100 w-full max-w-210">

                        </div>
                    </div>

                    <div className="border-2 h-full max-h-300 w-80">

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;