import { useEffect, useState } from "react";
import { Pie, ResponsiveContainer, PieChart, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Line } from "recharts";
import {
    LuHouse,
    LuChartNoAxesColumnIncreasing,
    LuLayoutGrid,
    LuHistory,
    LuUserRound,
    LuChartNoAxesCombined,
    LuArrowRight,
    LuRocket,
    LuUtensils,
    LuCarFront,
    LuGamepad2,
    LuShoppingBag,
    LuPackage,
    LuReceiptText,
    LuWallet,
    LuArrowDown,
    LuTrendingUp,
    LuTarget,
} from 'react-icons/lu';

import MonthYearSelect from '../components/MonthYearSelect';
import type { MonthlyItem, TransactionsSummary } from "../types/transactions";
import { getTransactionsMonthly, getTransactionsSummary } from "../services/transactionService";
import { Card } from "../components/Card";
import { formateCurrency } from "../utils/formatters";
import { currencyPorccentage } from "../utils/formatters";
import { RechartsDevtools } from "@recharts/devtools";
import { FaArrowUp } from "react-icons/fa";
import Sidebar from "../components/SideBar";

const initSummary: TransactionsSummary = {
    totalExpenses: 0,
    totalIncomes: 0,
    balance: 0,
    expensesByCategory: [],
};

interface ChartLabelProps {
    categoryName?: string;
    percent?: number;
};


const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [summary, setSummary] = useState<TransactionsSummary>(initSummary);
    const [PrevSummary, setPrevSummary] = useState<TransactionsSummary>(initSummary);
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([])

    useEffect(() => {
        async function loadTransactionsSummary(): Promise<void> {
            const response = await getTransactionsSummary(month, year);
            setSummary(response)
            console.log(response)
        };

        loadTransactionsSummary();
    }, [month, year]);

    useEffect(() => {
        async function loadTransactionsPrevDate(): Promise<void> {
            const response = await getTransactionsSummary(month - 1, year);
            setPrevSummary(response);
            console.log(response)
        };
        loadTransactionsPrevDate();
    }, [month, year]);

    useEffect(() => {
        async function getTransactionsMonthtly(): Promise<void> {
            const response = await getTransactionsMonthly(month, year, 8);
            setMonthlyItemsData(response.history);
            console.log(response)
        };
        getTransactionsMonthtly();
    }, [month, year]);

    const renderPieChatLabel = ({ categoryName, percent }: ChartLabelProps): string => {
        return `${categoryName ?? ''}: ${((percent ?? 0) * 100).toFixed(2)}%`
    }

    const formateToolTipValue = (value: number | string): string => {
        return formateCurrency(typeof value === 'number' ? value : 0)
    }

    return (
        <div className="flex">
            <Sidebar />
            <main className="py-7 px-20 max-[1000px]:px-10 w-full max-[500px]:px-3">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <div>
                            
                        </div>
                        <div className="flex gap-1">
                            <MonthYearSelect year={year} month={month} onMonthChange={setMonth} onYearChange={setYear} />
                            <button className="bg-[#031727] rounded-full w-10 h-10 ml-5 flex justify-center items-center p-2.5 "><LuUserRound className="text-3xl" /></button>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Card hover
                            glowEffect
                            icon={<LuWallet className="icon-dashboard-card text-primary-500" />}
                            title="Saldo Atual"
                            description="em relação ao mês anterior"
                            porcentage={currencyPorccentage(PrevSummary.balance, summary.balance) || '0'}
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.balance >= 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.balance)}
                            </h2>
                        </Card>

                        <Card hover
                            glowEffect={summary.totalExpenses >= 0}
                            icon={<LuArrowDown className="icon-dashboard-card text-red-600" />}
                            title="Despesas"
                            description="em relação ao mês anterior"
                            porcentage={currencyPorccentage(PrevSummary.totalExpenses * -1, summary.totalExpenses * -1) || '0'}
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.totalExpenses < 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.totalExpenses)}
                            </h2>
                        </Card>

                        <Card hover
                            glowEffect={summary.totalIncomes >= 0}
                            icon={<FaArrowUp className="icon-dashboard-card text-primary-600" />}
                            title="Receitas"
                            description="em relação ao mês anterior"
                            porcentage={currencyPorccentage(PrevSummary.totalIncomes, summary.totalIncomes) || '0'}
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.totalIncomes >= 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.totalIncomes)}
                            </h2>
                        </Card>
                    </div>
                </div>

                <div className="mt-10 flex max-[1600px]:flex-col-reverse gap-4 ">
                    <div className="flex flex-col w-full max-w-150">
                        <div className="w-full max-w-150 h-full max-h-110 rounded-2xl bg-[#031727] p-5 pt-0  max-[500px]:p-0  max-[500px]:pt-10">

                            <div className="w-full h-full px-0.5 relative max-[500px]:h-90">
                                <div className="flex justify-center items-center mb-5 gap-2">
                                    <LuTarget className="icon-dashboard-card text-[#00C9F2]" />
                                    <h3 className="mt-7 text-primary-500 text-xl">Despesas por categoria</h3>
                                </div>
                                {summary.expensesByCategory.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="80%">
                                        <PieChart>
                                            <Pie
                                                data={(summary.expensesByCategory ?? []).map((entry) => ({
                                                    ...entry,
                                                    amount: Math.abs(Number(entry.amount)),
                                                    fill: entry.categoryColor,
                                                }))}
                                                cx="50%"
                                                cy="50%"
                                                dataKey="amount"
                                                nameKey="categoryName"
                                                outerRadius="60%"
                                                stroke="none"
                                                label={renderPieChatLabel}
                                                isAnimationActive={true}
                                                animationDuration={800}
                                            />
                                            <Tooltip formatter={(value) => formateToolTipValue(Number(value ?? 0))} />
                                        </PieChart>
                                    </ResponsiveContainer>

                                ) : <div className="flex justify-center items-center h-60">
                                    <h2 className="text-lg font-medium text-[#00C9F2] opacity-70">NENHUMA DESPESA REGISTRADA NESSE MÊS</h2>
                                </div>}
                                <p className="text-center w-full text-[#00C9F2] opacity-65 text-xs absolute bottom-0">Veja como suas despesas se comportaram neste mês</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-full max-h-300 w-full max-w-300 max-[642px]:hidden">
                        <div className="w-full max-w-300 h-full rounded-2xl bg-[#031727] p-5 pt-0 max-[733px]:p-0">
                            <div className="w-full h-120">
                                <div className="flex justify-center items-center mb-5 gap-2">
                                    <LuTrendingUp className="icon-dashboard-card text-[#00C9F2]" />
                                    <h3 className="mt-7 text-primary-500 text-xl">Histórico mensal</h3>
                                </div>
                                {monthlyItemsData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="75%">
                                        <LineChart
                                        data={monthlyItemsData}
                                        margin={{ left: 40, right: 5}}
                                        >
                                            <CartesianGrid strokeDasharray='3 3' stroke="rgba(255, 255, 255, 0.1)"/>
                                            <XAxis dataKey="name" 
                                            stroke="#94A3B8" 
                                            tick={{style: { textTransform: 'capitalize', fontSize: 14  }}}/>

                                            <YAxis stroke="#94A3B8" 
                                            tickFormatter={formateCurrency} 
                                            tick={{style: { fontSize: 13 }}}
                                            />

                                            <Tooltip formatter={(value) => formateToolTipValue(Number(value ?? 0))} 
                                                contentStyle={{
                                                    backgroundColor: '#1A1A1A',
                                                    borderColor: '#2A2A2A'
                                                }}
                                                labelStyle={{ color: '#00C9F2', textTransform: 'capitalize'}}
                                                />
                                            <Legend />

                                            <Line type="monotone" 
                                            dataKey="expenses" 
                                            name="Despesas" 
                                            stroke="rgba(239, 68, 68, 0.7)" />
                                            
                                            <Line type="monotone" 
                                            dataKey="income" 
                                            name="Receitas" 
                                            stroke="rgba(55, 227, 89, 0.8)" />
                                            <RechartsDevtools />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : <div className="flex justify-center items-center h-full">
                                        <h2 className="text-xl font-medium text-[#00C9F2] opacity-70">NENHUM DADO REGISTRADO NESSE MÊS</h2>
                                    </div>}
                                <p className="text-center text-[#00C9F2] opacity-65 text-xs">Veja como suas despesas se comportaram neste mês</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;