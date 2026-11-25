import { LuArrowDown, LuArrowLeftRight, LuPlus, LuSearch, LuWallet } from "react-icons/lu";
import Button from "../components/Button";
import { Card } from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import { FaArrowUp } from "react-icons/fa";
import { Sidebar } from "../components/Sidebar";
import { useLocation } from "react-router";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import { FiAlertCircle } from "react-icons/fi";
import { TransactionType, type Transaction, type TransactionsSummary } from "../types/transactions";
import { deleteTransactions, getTransactions, getTransactionsSummary } from "../services/transactionService";
import { formateCurrency, formateDate } from "../utils/formatters";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import TransactionsForm from "../components/TransactionsForm";

const initSummary: TransactionsSummary = {
    totalExpenses: 0,
    totalIncomes: 0,
    balance: 0,
    expensesByCategory: [],
};

const Transactions = () => {

    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [loading, setLoanding] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [transactionsFiltered, setTransactionsFiltered] = useState<Transaction[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [deletingId, setDeletingId] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [summary, setSummary] = useState<TransactionsSummary>(initSummary);
    const [isActive, setIsActive] = useState<boolean>(false);

    const location = useLocation();

    const handleButton = () => {
        setIsActive(!isActive);
    };

    const fetchTransactions = async (month: number, year: number): Promise<void> => {
            try {
                setLoanding(true);
                setError('')

                const data = await getTransactions({month, year})
                setTransactions(data);
                setTransactionsFiltered(data);
            } catch {
                setError('Não foi possível carregar as transações, tente novamente');
            } finally {
                setLoanding(false);
            }
        };

        useEffect(() => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchTransactions(month, year);
        }, [month, year]);

        useEffect(() => {
                async function loadTransactionsSummary(): Promise<void> {
                    const response = await getTransactionsSummary(month, year);
                    setSummary(response)
                };
        
                loadTransactionsSummary();
            }, [month, year]);

    const handleDelete = async (id: string): Promise<void> => {
        try {
            setDeletingId(id);
            await deleteTransactions(id);
            toast.success('Transação deletada com sucesso');
            setTransactionsFiltered((prev) => prev.filter((t) => t.id !== id ));
        } catch (err) {
            console.error(err);
            toast.error('Falha ao deletar Transação');
        } finally {
            setDeletingId('');
        }
    };

    const confirmDelete = (id: string): void => {
        if(window.confirm('Tem certeza que deseja deletar essa transação?')) {
            handleDelete(id);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.target.value);
        setTransactionsFiltered(transactions.filter((transaction
        ) => transaction.description.toUpperCase().includes(event.target.value.toUpperCase())))
    };

    return (
        <div className="max-w-470 flex">
                <Sidebar urlLocation={location.pathname} />
            <div className="flex flex-col w-full items-center py-7 px-10 max-[520px]:px-1">
                <main className="flex flex-col w-full gap-7">
                    <section className="flex justify-between ml-7 flex-wrap">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <LuArrowLeftRight className="text-4xl text-[#00C9F2]" />
                                <h2 className="text-4xl max-[310px]:text-3xl font-extrabold">Transações</h2>
                            </div>
                            <p className="ml-13 text-[13px] max-[310px]:text-[12px] text-gray-400">Gerencie suas entradas e saidas, mantenha o controle do seu dinheiro</p>
                        </div>
                        <div>
                            <Button onClick={handleButton} className="rounded-xl mt-5"><LuPlus className="mr-1 text-xl font-bold" />Nova transação</Button>
                        </div>
                    </section>

                    <section className="flex gap-4 justify-center flex-wrap">
                        <Card hover
                            icon={<LuWallet className="icon-dashboard-card text-primary-500" />}
                            title="Saldo Atual"
                            className="justify-start gap-5 px-10"
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.balance >= 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.balance)}
                            </h2>
                        </Card>

                        <Card hover
                            icon={<LuArrowDown className="icon-dashboard-card text-red-600" />}
                            title="Despesas"
                            className="justify-start gap-5 px-10"
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.totalExpenses < 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.totalExpenses)}
                            </h2>
                        </Card>

                        <Card hover
                            icon={<FaArrowUp className="icon-dashboard-card text-primary-600" />}
                            title="Receitas"
                            className="justify-start gap-5 px-10"
                        >
                            <h2 className={`my-2 text-xl
                                ${summary.totalIncomes >= 0 ? 'text-primary-500' : 'text-red-800'}
                                `}>
                                {formateCurrency(summary.totalIncomes)}
                            </h2>
                        </Card>
                    </section>

                    <section className="flex max-[820px]:flex-col justify-between max-[820px]:items-start border border-[#075985] bg-[#031727] h-22 max-[820px]:h-30 rounded-2xl pl-10 max-[414px]:pl-5 pr-3 max-[820px]:py-2 items-center">
                        <div className="flex items-center gap-3">
                            <div className="ml-9 max-[380px]:ml-0">
                                <MonthYearSelect 
                                month={month} 
                                onMonthChange={setMonth} 
                                onYearChange={setYear} 
                                year={year} />
                            </div>
                        </div>
                        <div className="w-90 max-[520px]:w-auto max-[380px]:pl-0">
                            <Input 
                            fullWidth
                            placeholder='Buscar transações...' 
                            icon={<LuSearch />} 
                            onChange={handleSearchChange}
                            value={searchText}
                            className="pl-7"
                            />
                        </div>
                    </section>

                    <section className="border border-[#075985] rounded-2xl bg-[#031727] h-100 overflow-y-scroll [&::-webkit-scrollbar]:w-0">
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
                                <p className="text-gray-500 mb-4 text-center text-xl">Nenhuma transação encontrada</p>
                                <div>
                                    <Button onClick={handleButton} className="rounded-xl"><LuPlus className="mr-1 text-xl font-bold" />Nova transação</Button>
                                </div>
                            </div>
                        ) : 
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-700 min-h-full w-full">
                                <thead>
                                    <tr>
                                        <th 
                                        scope="col" 
                                        className="px-4 py-3 text-left text-sm font-medium text-gray-400 uppercase">
                                        Descrição
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-2 py-3 text-left text-sm font-medium text-gray-400 uppercase">
                                        Data
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-2 py-3 text-left text-sm font-medium text-gray-400 uppercase">
                                        Categoria
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-2 py-3 text-left text-sm font-medium text-gray-400 uppercase">
                                        valor
                                        </th>

                                        <th 
                                        scope="col" 
                                        className="px-2 py-3 text-left text-sm font-medium text-gray-400 uppercase">
                                        {' '}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-700">
                                    {transactionsFiltered.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-800">
                                            <td className="px-2 py-4 text-sm text-gray-400 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="px-2">
                                                        {transaction.type === TransactionType.income ? (
                                                            <FaArrowUp className="text-[13px] text-primary-500" />
                                                        ) : (
                                                            <LuArrowDown className="text-[14px] text-red-600" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-200">
                                                        {transaction.description}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-2 py-4 text-sm whitespace-nowrap">
                                                {formateDate(transaction.date)}
                                            </td>

                                            <td className="px-2 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 rounded-full mr-2" 
                                                    style={{ backgroundColor: transaction.category.color }} 
                                                    />
                                                    <span className="text-sm">
                                                        {transaction.category.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-2 py-4 text-sm whitespace-nowrap">
                                                <span className={`${transaction.type === TransactionType.income ? 'text-primary-500' : 'text-red-600' }`}>
                                                    {formateCurrency(transaction.amount)}
                                                </span>
                                            </td>

                                            <td className=" py-4 text-sm whitespace-nowrap">
                                                <button
                                                type="button"
                                                onClick={() => confirmDelete(transaction.id)}
                                                className="hover:text-red-600 rounded-full"
                                                disabled={deletingId === transaction.id}
                                                >
                                                {deletingId === transaction.id ? (
                                                    <span className="inline-block w-4 h-4 border-2 ml-0.5 border-red-600 border-t-transparent rounded-full animate-spin" 
                                                    />
                                                ): (
                                                    <BiTrash className="text-xl cursor-pointer" />
                                                )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }
                    </section>
                     {isActive && <TransactionsForm active={isActive} deactivate={() => setIsActive(false)}/>}
                </main>
            </div>
           
        </div>
    );
};

export default Transactions;