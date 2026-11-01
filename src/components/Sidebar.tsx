import { LuArrowLeftRight, LuHouse, LuPlus, LuTags, LuTrendingUp } from "react-icons/lu";
import { Link } from "react-router";

interface SidebarProps {
  urlLocation: string;
}

const Sidebar = ({ urlLocation }: SidebarProps) => {

  const isDashboard = urlLocation === "/dashboard";
  const isTransactions = urlLocation === "/transacoes";
  const isTransactionsNova = urlLocation === "/transacoes/nova";

    return (
        <div className="border-r border-blue-600 w-70">
            <main className="flex flex-col gap-5 px-2 py-5">
                <div className="flex justify-center items-center w-full">
                    <h3 className="text-center flex items-center text-2xl text-primary-600"><LuTrendingUp className="text-2xl text-primary-600" /> FinCast</h3>
                </div>

                <div className="flex flex-col gap-3 text-blue-600 ">
                    <Link 
                    to='/dashboard' 
                    className={`flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl max-[862px]:text-sm font-bold px-2
                        ${isDashboard  ? 'bg-blue-400 opacity-90 border rounded-2xl' : ''}
                    `}
                    ><LuHouse className="mr-2" /> Dashboard</Link>

                    <Link to='/transacoes' className={`flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl max-[862px]:text-sm font-bold px-2
                        ${isTransactions  ? 'bg-blue-400 opacity-90 border rounded-2xl' : ''}
                    `}><LuArrowLeftRight className="mr-2" /> Transações</Link>

                    <Link to='/transacoes/nova' className={`flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl max-[862px]:text-sm font-bold px-2
                        ${isTransactionsNova  ? 'bg-blue-400 opacity-90 border rounded-2xl' : ''}
                    `}><LuPlus className="mr-1 text-xl font-bold" /> Nova transação</Link>

                    <button className="flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl max-[862px]:text-sm font-bold px-2"><LuTags className="mr-2" /> Categorias</button>
                </div>

                <div className="border mt-auto">

                </div>
            </main>
        </div>
    );
};

export default Sidebar;