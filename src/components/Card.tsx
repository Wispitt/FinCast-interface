import type { JSX } from "react/jsx-runtime";
import {
  
} from 'react-icons/lu';
import type { ReactNode } from "react";

interface TransactionsMonth {
        icon?: JSX.Element;
        title?: string;
        porcentage?: string;
        description?: string;
        hover?: boolean;
        glowEffect?: boolean
        className?: string;
        children?: ReactNode;
    }

    // const transactions: ReadonlyArray<TransactionsMonth> = [
    //     {
    //       icon: <LuWallet className="icon-dashboard-card text-primary-500 border" />,
    //       title: "Saldo Atual",
    //       desccription: " em relação ao mês anterior"
    //     },
    //     {
    //       icon: <LuArrowDown className="icon-dashboard-card text-red-600 border" />,
    //       title: "Despesas",
    //       desccription: "↑ +8,2% em relação ao mês anterior"

    //     },
    //     {
    //       icon: <LuTrendingUp className="icon-dashboard-card text-primary-700 border" />,
    //       title: "Receitas",
    //       desccription: "↑ +5,6% em relação ao mês anterior"
    //     },
    //     {
    //       icon: <LuTarget className="icon-dashboard-card text-[#00C9F2] border" />,
    //       title: "Meta do Mês",
    //       desccription: "48%"
    //     },
    //   ];

export const Card = ({ children, icon, porcentage = '0', title, description, className, glowEffect = false, hover = false }: Partial<TransactionsMonth>) => {
    
    return (
        <div className="mt-5 flex gap-4 h-37 w-full max-w-80 justify-center">
            <div className={`border-2 border-[#103249] rounded-2xl bg-[#031727] flex items-center justify-center w-full max-w-80
              ${hover ? 'hover:border-primary-600 hover:shadow-lg hover:-translate-y-1 hover:transition-transform duration-500 ease-in-out' : ''}
              ${glowEffect ? 'glow' : ''}
              ${className}
              `}>
                <div className="mb-auto h-20"> {icon} </div>
                <div className="relative mr-9">
                  <h4 className="text-[#00C9F2]"> {title} </h4>
                  {children}                          
                  <p className={`text-[11px] left-15 text-[#00C9F2]
                    ${porcentage >= '0' ? 'text-primary-500' : 'text-red-600'}
                    `}>  {porcentage} {description} </p>
                </div>
            </div>       
        </div>
    );
};