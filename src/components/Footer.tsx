import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="border-t border-blue-600 ">
            <div className="py-4 px-6 max-[485px]:px-2 flex justify-between items-center">
                <div className="flex flex-col w-full max-w-60 max-[444px]:hidden">
                    <div className="flex gap-1 text-2xl max-[850px]:text-xl items-center">
                        <LuChartNoAxesCombined className="text-[#00C9F2]" />
                        <h1 className="flex text-gray-100"
                        >Fin
                        <span className="text-[#00C9F2]">Cast</span></h1>
                    </div>

                    <p className="text-sm max-[850px]:text-xs text-gray-100 max-[880px]:hidden">Sua vida financeira no controle, de forma simples e inteligente</p>
                    <p className="mt-3 text-sm max-[850px]:text-[11px] "> <span className="underline">© {currentYear} FinCast.</span> Desenvolvido por - 
                        <span className="text-[#00C9F2] font-bold tracking-wide">Wesley Santos</span>- </p>
                </div>

                <div className="flex text-gray-500 text-sm max-[850px]:text-xs flex-col ml-5 mb-auto">
                    <h4 className="mb-3 text-gray-100 text-lg font-medium">Produto</h4>
                    <p>Recursos</p>
                    <p>Planos</p>
                    <p>Novidades</p>
                    <p>Roadmap</p>
                </div>

                <div className="flex text-gray-500 text-sm max-[850px]:text-xs flex-col ml-5 mb-auto">
                    <h4 className="mb-3 text-gray-100 text-lg font-medium">Suporte</h4>
                    <p>FAQ</p>
                    <p>Central de Ajuda</p>
                    <p>Privacidade</p>
                    <p>Termos de Uso</p>
                </div>

                <div className="flex text-gray-500 text-sm max-[850px]:text-xs flex-col ml-5 mb-auto">
                    <h4 className="mb-3 text-gray-100 text-lg font-medium">Empresa</h4>
                    <p>Sobre Nós</p>
                    <p>Contato</p>
                    <p>Blog</p>
                    <p>Carreiras</p>
                </div>

                <div className="flex flex-wrap gap-4 w-5 text-gray-500 text-xl ml-5">
                    <FaGithub className="cursor-pointer hover:opacity-70" />
                    <FaInstagram className="cursor-pointer hover:opacity-70" />
                    <FaLinkedin className="cursor-pointer hover:opacity-70" />
                    <FaYoutube className="cursor-pointer hover:opacity-70" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;