import { FaChevronDown } from "react-icons/fa";
import { LuCalendarDays, LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface MonthYearSelectProps {
    month: number;
    year: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
};

const monthNames: readonly string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const MonthYearSelect = ({ month, onMonthChange, onYearChange, year }: MonthYearSelectProps) => {

    const currentYear = new Date().getFullYear();
    const years: number[] = Array.from({ length: 11}, (_, i) => currentYear - 5 + i);

    const handleNextMonth = (): void => {
        if(month === 12) {
            onYearChange(year + 1);
            onMonthChange(1);
        } else {
            onMonthChange(month + 1)
        }
    };

    const handlePrevMonth = (): void => {
        if(month === 1) {
            onYearChange(year - 1);
            onMonthChange(12);
        } else {
            onMonthChange(month - 1)
        }
    };
 
    return (
        <div className="relative flex  border p-6 border-[#075985] bg-[#031727] rounded-xl items-center h-10 w-60 pl-4 pr-1 mr-10 justify-center ">
            <button 
            type="button" 
            onClick={handlePrevMonth} 
            className="absolute cursor-pointer -left-13 rounded-lg text-3xl flex max-[380px]:hidden items-center justify-center bg-[#031727] hover:opacity-80 text-gray-400 transition-colors"
            aria-label="Botão para selecionar mês anterior"
            >
                <LuChevronLeft className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
            </button>

            <FaChevronDown className="text-gray-300 absolute left-33" aria-label="Seta para selecionar mês" />
            <label htmlFor="month-select" className="sr-only">Selecionar mês</label>
            <LuCalendarDays className="text-2xl mr-2" />
            <select id="month-select"
                className="bg-[#031727] hover:opacity-50 cursor-pointer rounded-sm h-10 w-30 mr-3 focus:outline-none focus:ring-0 appearance-none"
                value={month}
                onChange={(event) => onMonthChange(Number(event?.target.value))}
                >
                {monthNames.map((name, index) => (
                    <option key={name} value={index + 1}> {name} </option>
                ))}
            </select>
            <FaChevronDown className="text-gray-300 absolute right-3" aria-label="Seta para selecionar mês" />

            <label htmlFor="year-select" className="sr-only">Selecionar ano</label>
            <select id="year-select" 
                className="bg-[#031727] hover:opacity-50 cursor-pointer h-10 w-20 focus:outline-none focus:ring-0 appearance-none"
                value={year}
                onChange={(event) => onYearChange(Number(event?.target.value))}
                >
                {years.map((name) => (
                    <option key={name} value={name}> {name} </option>
                ))}
            </select>

            <button 
            type="button" 
            onClick={handleNextMonth} 
            className="absolute cursor-pointer -right-13 rounded-lg text-3xl flex max-[380px]:hidden items-center justify-center bg-[#031727] hover:opacity-80 text-gray-400 transition-colors"
            aria-label="Botão para selecionar mês seguinte"
            >
                <LuChevronRight className="border text-3xl h-12 w-10 p-2 cursor-pointer rounded-lg border-[#075985] bg-[#031727]" />
            </button>
        </div>
    );
};

export default MonthYearSelect;