import { useState } from "react";
import { LuArrowLeftRight, LuHouse, LuPlus, LuTags, LuTrendingUp } from "react-icons/lu";
import { Link } from "react-router";
import TransactionsForm from "./TransactionsForm";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../hooks/AuthContext";

interface SidebarProps {
  urlLocation: string;
}

const Sidebar = ({ urlLocation }: SidebarProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const { signOut } = useAuth();
    const isDashboard = urlLocation === "/dashboard";
    const isTransactions = urlLocation === "/transacoes";

    const handleButton = () => {
        setIsActive(!isActive);
    };

    const signOutUser = () => {
        signOut();
    };

    return (
        <div className="w-full max-w-70 max-[1206px]:hidden">
            <main className="flex flex-col w-full gap-5 px-2 py-5">
                <div className="flex justify-center items-center w-full">
                    <h3 className="text-center flex items-center text-2xl text-primary-600"><LuTrendingUp className="text-2xl text-primary-600" /> FinCast</h3>
                </div>

                <div className="flex flex-col gap-3 text-blue-600 ">
                    <Link 
                    to='/dashboard' 
                    className={`transition-colors flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl font-bold px-2
                        ${isDashboard  ? 'bg-blue-400 opacity-90 border rounded-2xl' : ''}
                    `}
                    ><LuHouse className="mr-2" /> Dashboard</Link>

                    <Link to='/transacoes' className={`transition-colors flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl font-bold px-2
                        ${isTransactions  ? 'bg-blue-400 opacity-90 border rounded-2xl' : ''}
                    `}><LuArrowLeftRight className="mr-2" /> Transações</Link>

                    <button onClick={handleButton} className={`transition-colors flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl font-bold px-2

                    `}><LuPlus className="mr-1 text-xl font-bold" /> Nova transação</button>

                    <button className="transition-colors flex items-center h-10 hover:bg-blue-400 hover:opacity-90 hover:border hover:rounded-2xl cursor-pointer text-xl font-bold px-2"><LuTags className="mr-2" /> Categoria</button>

                    <div className="transition-colors text-red-600 hover:text-gray-400 hover:bg-red-500 hover:opacity-90 hover:border-red-700 flex items-center h-10  hover:rounded-2xl cursor-pointer text-xl font-bold px-2">
                        <Link to='/' onClick={signOutUser} className="flex items-center gap-2"><BiLogOut /> Sair</Link>
                    </div>
                </div>
            </main>
            {isActive && <TransactionsForm active={isActive} deactivate={() => setIsActive(false)}/>}
        </div>
    );
};

export default Sidebar;