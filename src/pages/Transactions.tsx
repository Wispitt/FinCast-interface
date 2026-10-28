import { LuArrowLeftRight, LuChevronLeft, LuChevronRight, LuPlus, LuSearch } from "react-icons/lu";
import Button from "../components/Button";
import { Card } from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";

const Transactions = () => {
    return (
        <div className="p-15 max-w-470 flex flex-col justify-center">
            <main className="flex flex-col gap-7">
                <section className="flex justify-between ml-7">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <LuArrowLeftRight className="text-4xl text-[#00C9F2]" />
                            <h2 className="text-4xl font-extrabold">Transações</h2>
                        </div>
                        <p className="ml-13 text-[13px] text-gray-400">Gerencie suas entradas e saidas, mantenha o controle do seu dinheiro</p>
                    </div>
                    <div>
                        <Button className="rounded-xl"><LuPlus className="mr-1 text-xl font-bold" />Nova transação</Button>
                    </div>
                </section>

                <section className="flex">
                    <Card glowEffect hover/>
                </section>

                <section className="flex justify-between border border-[#075985] bg-[#031727] h-20 rounded-2xl pl-10 pr-3 items-center">
                    <div className="flex items-center gap-3">
                        <LuChevronLeft className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
                        <div className="border p-1 rounded-2xl border-[#075985] bg-[#031727]">
                            <MonthYearSelect className="text-[#0679b8]" />
                        </div>
                        <LuChevronRight className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
                    </div>
                    <div className="flex items-center gap-3 text-[#0679b8] border border-[#075985] bg-[#04131f] h-10 rounded-xl pl-2 ">
                        <LuSearch className="text-xl " />
                        <input className="focus:outline-none text-sm w-55 pr-3" type="text" placeholder="Buscar transação..." />
                    </div>
                </section>

                <section className="border rounded-2xl bg-[#031727] h-100">
                    TRANSACTIONS
                </section>
            </main>
        </div>
    );
};

export default Transactions;