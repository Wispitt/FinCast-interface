import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVarient = "primary" | "outline" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVarient;
    fullWidth?: boolean;
    isLoanding?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    isLoanding = false,
    className,
    disabled,
    ...rest
}: ButtonProps) => {

    const variantClasses = {
        primary: "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 hover:-translate-y-1 active:opacity-70",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
        secondary: "bg-gray-800 text-white hover:bg-gray-700",
        success: "bg-green-500 text-[#051626] hover:brightness-90 hover:-translate-y-0.5 active:opacity-70", 
        danger: "bg-red-500 text-white hover:brightness-90",
    };

    const renderLoading = () => {
        return (
            <div className="flex gap-1">
                <svg className="size-4.5 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a17"><stop offset="0" stop-color="#051626" stop-opacity="0"></stop><stop offset="1" stop-color="#051626"></stop></linearGradient><circle fill="none" stroke="url(#a17)" stroke-width="30" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="0.8" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
                Carregando
            </div>
        )
    }

    return (
        <button
            type="button"
            className={`cursor-pointer px-3 py-2 rounded-3xl font-medium transform transition-transform duration-400 ease-in-out flex items-center justify-center 
            ${variantClasses[variant]}
            ${isLoanding || disabled ? 'opacity-70 cursor-not-allowed' : ''}
            ${className}
            ${fullWidth ? 'w-full' : ''}
            `}
            disabled={isLoanding || disabled}
            {...rest}
        > {isLoanding ? renderLoading() : children} </button>
    )
}

export default Button;