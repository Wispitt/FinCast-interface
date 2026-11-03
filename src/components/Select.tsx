import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SlectOptions {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    fullWidth?: boolean;
    options: SlectOptions[]
}

const Select = ({ label, error, icon, fullWidth = false, options, ...props }: SelectProps) => {

    const selectId = useId();
    
    return (
        <div>
            <div className={`${ fullWidth ? 'w-full' : '' } flex items-center`}>
                {label && (
                    <label htmlFor={selectId}>
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                            {icon}
                        </div>
                    )}
                </div>

                <div className="relative w-full">
                    <FaChevronDown 
                        className="text-gray-300 absolute right-3 top-3.5" 
                        aria-label="Seta para selecionar mês" />
                    
                    <select id={selectId} {...props} className={`
                        bg-[#04131f] border pl-8.5 hover:opacity-50 text-[15px]
                        cursor-pointer w-full rounded-xl p-2 mr-3 focus:outline-none 
                        focus:ring-0 appearance-none ${error ? 'border-e-red-600' : 'border-[#075985]'}
                        `}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600"> {error} </p>
            )}
        </div>
    );
};

export default Select;