import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    id?: string;
    icon?: ReactNode;
    fullWidth?: boolean;
}

const Input = ({ id, label, icon, className, error, fullWidth, ...rest }: InputProps) => {

    const generatedId = useId()
    const inputId = id || generatedId;

    return (
        <div className={`relative ${fullWidth ? 'w-full' : 'w-70' }`}>
            <div className={`flex items-center gap-3 border bg-[#04131f] hover:border-[#00C9F2] h-10 rounded-xl pl-2 focus:ri focus:bg-[#04131f]
                ${error ? 'border-red-600' : 'border-blue-600'}
            `}>
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-400">
                        {label}
                    </label>
                )}
                <div className="text-gray-400 text-xl flex items-center absolute">
                    {icon && (
                    <div>
                        {icon}
                    </div>
                )}
                </div>
                
                <input 
                id={inputId}
                className={`focus:outline-none text-sm w-full pr-3 transition-all 
                    bg-[#04131f] text-white
                    [&:-webkit-autofill]:[-webkit-text-fill-color:white]
                    [&:-webkit-autofill]:bg-[#04131f]
                    [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
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