import { LuArrowLeftRight, LuChartNoAxesCombined, LuLayoutDashboard, LuTags, LuUserRound } from "react-icons/lu";
import { Link } from "react-router";


const Header = () => {
    return (
        <div className="border-b border-blue-600">
            <div className="py-3 px-5 flex justify-between items-center">
                <div className="flex gap-1 justify-start text-3xl max-[710px]:text-xl max-[600px]:hidden">
                    <LuChartNoAxesCombined className="text-[#00C9F2]" />
                    <h1 className="flex text-gray-100"
                    >Fin
                    <span className="text-[#00C9F2]">Cast</span></h1>
                </div>

                <div className="flex text-lg max-[860px]:text-sm gap-15 max-[860px]:gap-7 text-gray-100">
                    <Link to='/dashboard' className="flex items-center gap-1 hover:text-[#00C9F2]"><LuLayoutDashboard className="text-xl max-[480px]:hidden" />Dashboard</Link>
                    <Link to='/transacoes' className="flex items-center gap-1 hover:text-[#00C9F2]"><LuArrowLeftRight className="text-xl max-[480px]:hidden" />Transações</Link>
                    <Link to='/transacoes' className="flex items-center gap-1 hover:text-[#00C9F2]"><LuTags className="text-[23px] max-[480px]:hidden" />Categorias</Link>
                </div> 

                <div className="flex gap-2">
                    <LuUserRound className="text-4xl text-gray-500 p-1 rounded-full border border-[#00C9F2] hover:opacity-80" />
                </div>
            </div>
        </div>
    );
};

export default Header;