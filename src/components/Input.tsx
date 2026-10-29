import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    id?: string;
    icon?: ReactNode;
}

const Input = ({ id, label, icon, className, error, ...rest }: InputProps) => {

    const generatedId = useId()
    const inputId = id || generatedId;

    return (
        <div className="relative">
            <div className={`flex items-center gap-3 border bg-[#04131f] h-10 rounded-xl pl-2 focus:ri
                ${error ? 'border-red-600' : 'border-blue-600'}
            `}>
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-400 mb-2">
                        {label}
                    </label>
                )}
                <div className="text-gray-400 text-xl flex items-center ">
                    {icon && (
                    <div>
                        {icon}
                    </div>
                )}
                </div>
                
                <input 
                id={inputId}
                className={`focus:outline-none text-sm w-55 pr-3 transition-all py-2
                ${className}
                `}
                {...rest}
                />
            </div>
            {error && (
                    <p className="absolute -bottom-1 ml-1 h-1 text-[13px] text-red-600"> {error} </p>
                )}
        </div>
    );
};

export default Input;