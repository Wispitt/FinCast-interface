import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectorProps {
    value: TransactionType;
    id?: string;
    onChange: (type: TransactionType) => void;
}

const TransactionTypeSelector = ({ value, onChange, id }: TransactionTypeSelectorProps) => {
    const transactionsTypeButtons = [
        {
            type: TransactionType.expense,
            icon: <FaArrowDown className="text-xl" />,
            label: 'Despesa',
            activeClasses: 'bg-red-500 border-red-600 text-red-700 font-bold',
            inativeClasses: 'bg-tranparent border-red-400 text-red-500 font-bold hover:bg-red-500 hover:text-red-600 hover:border-red-500',
        },
        {
            type: TransactionType.income,
            icon: <FaArrowUp className="text-xl" />,
            label: 'Receita',
            activeClasses: 'bg-green-500 border-green-500 text-green-700 font-bold',
            inativeClasses: 'bg-tranparent border-green-600 text-green-700 font-bold hover:bg-green-500 hover:text-green-600 hover:border-green-500',
        },
    ]

    return (
        <fieldset id={id} className="grid grid-cols-2 gap-2">
            {transactionsTypeButtons.map((item) => (
                <button 
                key={item.type} 
                type="button"
                onClick={() => onChange(item.type)}
                className={`cursor-pointer flex items-center justify-center border rounded-xl px-4 py-2 gap-2 transition-all text-lg 
                    ${value === item.type ? item.activeClasses : item.inativeClasses}`}
                
                >
                  {item.icon}  {item.label}
                </button>
            ))}
        </fieldset>
    );
};

export default TransactionTypeSelector;