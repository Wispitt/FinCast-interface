import { LuArrowLeftRight, LuLayoutDashboard, LuLogOut, LuTags } from "react-icons/lu";
import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/AuthContext";
import { useState } from "react";
import { FiActivity } from "react-icons/fi";
import { BiLogIn, BiLogOut, BiMenu, BiX } from "react-icons/bi";

interface NavLink {
    name: string;
    path: string;
};

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { authState, signOut } = useAuth();
    const { pathname } = useLocation();

    const  navLink: NavLink[] = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Transações', path: '/transacoes' },
        { name: 'Categorias', path: '/categorias' },
    ];

    const changeMenu = (): void => {
        setIsOpen(!isOpen);
    };

    const renderAvatar = () => {
        if (!authState.user) return null;

        if (authState.user.photURL) {
            return <img src={authState.user?.photURL} 
            alt="Avatar de usuário" 
            className="text-gray-500 w-10 h-10 p-1 rounded-full border border-[#00C9F2] hover:opacity-80" />
        }

        return (
            <div className="text-xl font-medium text-gray-500 p-1 rounded-full border border-[#00C9F2] bg-[#075985] hover:opacity-80"
                > {authState.user?.displayName?.charAt(0)} </div>
        )
    };

    const isAuthenticated: boolean = !!authState.user;

    const signOutUser = (): void => {
        signOut();
    };

    return (
        <header className="border-b border-blue-600">
            <div className="py-3 px-5 max-[660px]:pr-0 flex justify-between items-center">
                <Link to='/' className="flex gap-1 justify-start text-3xl max-[710px]:text-xl ">
                    <FiActivity className="text-[#00C9F2]" />
                    <h1 className="flex text-gray-100 font-bold"
                    >Fin
                    <span className="text-[#00C9F2]">Cast</span></h1>
                </Link>

                {isAuthenticated && (
                    <nav className="flex text-lg max-[965px]:text-sm gap-15 max-[965px]:gap-7 max-[660px]:hidden text-gray-200">
                        <Link to='/dashboard' className={`flex items-center gap-1 hover:text-[#00C9F2]
                            ${pathname === '/dashboard' ? 'border-b-2 border-[#00C9F2] text-[#00C9F2]' : ''}`}
                            ><LuLayoutDashboard className="text-xl max-[480px]:hidden" />Dashboard</Link>

                        <Link to='/transacoes' className={`flex items-center gap-1 hover:text-[#00C9F2]
                            ${pathname === '/transacoes' ? 'border-b-2 border-[#00C9F2] text-[#00C9F2]' : ''}`}
                            ><LuArrowLeftRight className="text-xl max-[480px]:hidden" />Transações</Link>
                        <Link to='/categorias' className={`flex items-center gap-1 hover:text-[#00C9F2]
                            ${pathname === '/categorias' ? 'border-b-2 border-[#00C9F2] text-[#00C9F2]' : ''}`}
                            ><LuTags className="text-[23px] max-[480px]:hidden" />Categorias</Link>
                    </nav> 
                )}

                {isAuthenticated ? (
                    <div className="flex gap-2 item items-center max-[660px]:hidden">
                        {renderAvatar()}
                        <p className="text-sm font-medium max-[840px]:hidden max-[660px]:flex"> Olá, 
                            <span className="text-[#00C9F2]"> {authState.user?.displayName}! </span> </p>
                        <Link onClick={signOutUser} to='/'>
                            <LuLogOut className="ml-3 text-gray-400 hover:text-red-500 hover:opacity-80 cursor-pointer" />
                        </Link>
                    </div>
                ): (
                    <Link to='/login'>
                        <BiLogIn className="px-5 py-2.5 text-gray-400 font-semibold rounded-xl bg-primary-500 flex items-center justify-center hover:opacity-80 transition-all" />
                    </Link>
                )}

                <div className="ml-auto mr-2 min-[660px]:hidden">
                    <button 
                    type="button"
                    className="text-gray-400 p-1 rounded-2xl hover:bg-gray-800 transition-colors"
                    onClick={changeMenu}
                    >
                        { isOpen ? <BiX size={25} /> : <BiMenu size={24} /> }
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="h-full max-h-70 w-full max-w-45 z-99 absolute right-9 top-8 bg-[#031727]">
                    <div className="h-full">
                        {isAuthenticated ? (
                            <div className="h-full">
                                <div className="py-2 px-1 w-full h-full bg-[#031727] ml-auto border border-[#00C9F2] rounded-xl flex flex-col gap-4 items-center">
                                    <div className="flex gap-2 item items-center justify-center z-9">
                                        {renderAvatar()}
                                        <span className="text-[#00C9F2] text-xs"> {authState.user?.displayName}</span>
                                    </div>

                                    {navLink.map((link) => (
                                        <Link 
                                        key={link.path} 
                                        to={link.path}
                                        className={`text-center rounded-2xl w-40 flex flex-col gap-3 text-xl
                                        ${pathname === link.path 
                                            ? 'border-b-2 border-[#00C9F2] text-[#00C9F2] font-medium' 
                                            : 'hover:text-[#00C9F2] text-gray-200 text-lg font-medium'}
                                        `}
                                        onClick={changeMenu}>
                                            {link.name}
                                        </Link>
                                    ))}

                                    <div className="transition-colors text-red-600 hover:opacity-80 flex items-center justify-center w-full cursor-pointer text-xl font-bold pr-3 mt-auto">
                                        <Link to='/' onClick={signOutUser} className="flex items-center gap-2"><BiLogOut /> Sair</Link>
                                    </div>  
                                </div>
                            </div>
                        ) : (
                            <Link to='/login'>
                                <BiLogIn className="px-5 py-2.5 text-gray-400 font-semibold rounded-xl bg-primary-500 flex items-center justify-center hover:opacity-80 transition-all" />
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;