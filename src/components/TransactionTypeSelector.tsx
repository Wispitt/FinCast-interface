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
            label: 'Despesa',
            activeClasses: 'bg-red-500 border-red-500 text-red-700 font-medium',
            inativeClasses: 'bg-tranparent border-red-300 text-red-500 hover:bg-red-500 hover:text-red-600 hover:border-red-500',
        },
        {
            type: TransactionType.income,
            label: 'Receita',
            activeClasses: 'bg-green-100 border-green-500 text-green-700 font-medium',
            inativeClasses: 'bg-tranparent border-green-300 text-green-500 hover:bg-green-500 hover:text-green-600 hover:border-green-500',
        },
    ]

    return (
        <fieldset id={id} className="grid grid-cols-2 gap-2">
            <legend>Tipo de Transação</legend>

            {transactionsTypeButtons.map((item) => (
                <button 
                key={item.type} 
                type="button"
                onClick={() => onChange(item.type)}
                className={`cursor-pointer flex items-center justify-center border rounded-md px-4 py-2 transition-all text-sm 
                    ${value === item.type ? item.activeClasses : item.inativeClasses}`}
                
                >
                    {item.label}
                </button>
            ))}
        </fieldset>
    );
};

export default TransactionTypeSelector;