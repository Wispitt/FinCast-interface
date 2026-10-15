import { FaChartBar, FaHistory, FaLongArrowAltRight, FaRocket, FaTags, FaWallet } from "react-icons/fa";
import Button from "../components/Button";
import { IoChevronForward } from "react-icons/io5";
import type { JSX } from "react/jsx-runtime";

import backgroundEnd from '../assets/background-end.png';
import mainImage from '../assets/main-image.png'

interface Feature {
    icon: JSX.Element;
    title: string;
    desccription: string;
    iconArrow: JSX.Element;
}

const Home = () => {

    const features: ReadonlyArray<Feature> = [
    {
      icon: <FaWallet className="icons-app" />,
      title: "Controle Financeiro",
      desccription: "Monitore seus gastos e receitas em tempo real, com uma interface simples e intuitiva.",
      iconArrow: <IoChevronForward className="arrow-app" />
    },
    {
      icon: <FaChartBar className="icons-app" />,
      title: "Relatórios inteligentes",
      desccription:
        "Visualize gráficos e análises detalhadas para entender melhor seu dinheiro.",
      iconArrow: <IoChevronForward className="arrow-app" />
    },
    {
      icon: <FaTags className="icons-app" />,
      title: "Categorias flexíveis",
      desccription: "Organize seus gastos em categorias personalizadas e tenha mais controle sobre cada área da sua vida.",
      iconArrow: <IoChevronForward className="arrow-app" />
    },
    {
      icon: <FaHistory className="icons-app" />,
      title: "Histórico completo",
      desccription:
        "Acesse todo o seu histórico de transações e acompanhe sua evolução ao longo do tempo.",
      iconArrow: <IoChevronForward className="arrow-app" />
    },
  ];

    return (
        <div className="px-14">
            <div className="flex flex-col items-center">
                <section className="flex mt-17 w-full justify-center">
                    <div className="w-170">
                        <div className="border-b-2 border-t-2 border-solid border-primary-500 text-primary-500  w-70 rounded-full h-9 text-sm flex justify-center items-center">
                            <span className="">SUAS FINANÇAS, SOB CONTROLE</span>
                        </div>
                        <h2 className="my-4 text-5xl leading-13 text-white">Seu dinheiro, <span className="text-primary-500">suas escolhas.</span></h2>
                        <p className="mb-6 text-sm max-w-140 text-wrap">O FinCast é seu aliado na gestão financeira.
                            Controle seus gastos,
                            acompanhe seus objetivos e construa um futuro mais estável.</p>
                        <Button className="w-46 group ml-5">Começar agora <FaLongArrowAltRight className="ml-2 transition-transform duration-1000 ease-in-out group-hover:translate-x-1.5" /></Button>
                    </div>
                    <img className="max-w-120" src={mainImage} />
                </section>

                <div className="my-15 text-center flex flex-col items-center">
                    <h3 className="text-3xl w-90 text-white">Tudo o que você precisa para <span className="text-primary-500">evoluir</span></h3>
                    <p className="mt-5 w-100 text-[14px] text-start text-gray-500">Ferramentas completas e intuitivas para você ter mais clareza, 
                        organização e tranquilidade com o seu dinheiro.</p>
                </div>

                <section className="grid grid-cols-2 gap-3 w-full max-w-290">
                    {features.map((feature) => (
                        <div key={feature.title} className="container-app group">
                            {feature.icon}
                            <div>
                                <h4 className="title-app">{feature.title}</h4>
                                <p className="paragraph-app">{feature.desccription}</p>
                            </div>
                            {feature.iconArrow}
                        </div>
                    ))}
                </section>
            
                <section className="my-10 bg-[url('/src/assets/background-end.png')]  border-2 rounded-lg border-primary-500 h-50 w-full max-w-290 flex justify-center items-center">
                    <div className="flex justify-center items-center w-full text-center">
                        <FaRocket className="icons-app" />
                        <div className="flex flex-col items-center mx-12">
                            <h3 className="text-xl font-bold text-white">Dê o próximo passo com a FinCast</h3>
                            <p className="w-80 text-[13px] text-gray-400 mt-2">Comece hoje mesmo a organizar suas finanças 
                                e conquiste seus objetivos com mais facilidade.</p>
                        <Button className="w-46 group mt-5">Criar conta<FaLongArrowAltRight className="ml-2 transition-transform duration-1000 ease-in-out group-hover:translate-x-1.5" /></Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;