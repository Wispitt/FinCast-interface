import { LuArrowDown, LuArrowLeftRight, LuChevronLeft, LuChevronRight, LuPlus, LuSearch, LuWallet } from "react-icons/lu";
import Button from "../components/Button";
import { Card } from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import { FaArrowUp } from "react-icons/fa";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { FiAlertCircle } from "react-icons/fi";
import { TransactionType, type Transaction } from "../types/transactions";
import { getTransactions } from "../services/transactionService";

const Transactions = () => {
    
    const navigate = useNavigate();

    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [loading, setLoanding] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = async (month: number, year: number): Promise<void> => {
            try {
                setLoanding(true);
                setError('')

                const data = await getTransactions({month, year})
                setTransactions(data);
            } catch {
                setError('Não foi possível carregar as transações, tente novamente');
            } finally {
                setLoanding(false);
            }
        };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTransactions(month, year);
    }, [month, year])

    return (
        <div className="max-w-470 flex">
                <Sidebar />
            <div className="flex flex-col w-full items-center p-7">
                <main className="flex flex-col w-full gap-7">
                    <section className="flex justify-between ml-7">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <LuArrowLeftRight className="text-4xl text-[#00C9F2]" />
                                <h2 className="text-4xl font-extrabold">Transações</h2>
                            </div>
                            <p className="ml-13 text-[13px] text-gray-400">Gerencie suas entradas e saidas, mantenha o controle do seu dinheiro</p>
                        </div>
                        <div>
                            <Button onClick={() => navigate('/transacoes/nova')} className="rounded-xl"><LuPlus className="mr-1 text-xl font-bold" />Nova transação</Button>
                        </div>
                    </section>

                    <section className="flex gap-4">
                        <Card hover
                            icon={<LuWallet className="icon-dashboard-card text-primary-500" />}
                            title="Saldo Atual"
                            porcentage=" "
                            className="h-30"
                        >
                            <h2 className='my-2 text-xl'>1</h2>
                        </Card>

                        <Card hover
                            icon={<LuArrowDown className="icon-dashboard-card text-red-600" />}
                            title="Despesas"
                            porcentage=" "
                            className="h-30"
                        >
                            <h2 className='my-2 text-xl'>
                                1
                            </h2>
                        </Card>

                        <Card hover
                            icon={<FaArrowUp className="icon-dashboard-card text-primary-600" />}
                            title="Receitas"
                            porcentage=" "
                            className="h-30"
                        >
                            <h2 className='my-2 text-xl'>
                                1
                            </h2>
                        </Card>
                    </section>

                    <section className="flex justify-between border border-[#075985] bg-[#031727] h-22 rounded-2xl pl-10 pr-3 items-center">
                        <div className="flex items-center gap-3">
                            <LuChevronLeft className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
                            <div className="border p-1 rounded-2xl border-[#075985] bg-[#031727]">
                                <MonthYearSelect 
                                month={month} 
                                onMonthChange={setMonth} 
                                onYearChange={setYear} 
                                year={year} />
                            </div>
                            <LuChevronRight className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
                        </div>
                        <div>
                            <Input placeholder='Buscar transações...' icon={<LuSearch />}  />
                        </div>
                    </section>

                    <section className="border border-[#075985] rounded-2xl bg-[#031727] h-100">
                        {loading ? (
                            <div className="h-full flex justify-center items-center">
                                <div className="flex flex-col items-center justify-center gap-3" />
                                <div className="relative w-12 h-12 rounded-full border-5 border-[#00C9F2]/15 border-t-[#00C9F2] animate-spin"/>
                            </div>
                        ) : error ? (
                            <div className=" h-full flex flex-col justify-center gap-1 items-center">
                                <FiAlertCircle className="text-3xl text-red-600" />
                                <p className="text-red-600"> {error} </p>
                                <Button className="mx-auto mt-3 text-sm" onClick={() => fetchTransactions(month, year)}>Tentar novamente</Button>
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="flex flex-col justify-center items-center h-full py-12">
                                <p className="text-gray-500 mb-4 text-xl">Nenhuma transação encontrada</p>
                                <div>
                                    <Button onClick={() => navigate('/transacoes/nova')} className="rounded-xl"><LuPlus className="mr-1 text-xl font-bold" />Nova transação</Button>
                                </div>
                            </div>
                        ) : 
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-700 min-h-full">
                                <thead>
                                    <tr>
                                        <th 
                                        scope="col" 
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Descrição
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Data
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Categoria
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        valor
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        {' '}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-700">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-800">
                                            <td className="">
                                                <div>
                                                    <div>
                                                        {transaction.type === TransactionType.income ? (
                                                            <FaArrowUp className="text-sm text-primary-500" />
                                                        ) : (
                                                            <LuArrowDown className="text-sm text-red-600" />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Transactions;