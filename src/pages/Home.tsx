import { FaArrowRight, FaLongArrowAltRight } from "react-icons/fa";
import Button from "../components/Button";

const Home = () => {
    return (
        <div className="px-14">
            <div className="flex flex-col">
                <section className="flex mt-17">
                    <div className="w-100">
                        <div className="border-2 border-solid border-primary-500 w-70">
                            <span className="size-0.5">SUAS FINANÇAS, SOB CONTROLE</span>
                        </div>
                        <h2 className="mt-4 ">Seu dinheiro, <span>suas escolhas.</span></h2>
                        <p>O FinCast é seu aliado na gestão financeira.
                            Controle seus gastos,
                            acompanhe seus objetivos e construa um futuro mais estável.</p>
                        <Button>Começar agora <FaLongArrowAltRight /></Button>
                    </div>
                    <img />
                </section>

                <div className="my-10">
                    <h3>Tudo o que você precisa para <span>evoluir</span></h3>
                    <p>Ferramentas completas e intuitivas para você ter mais clareza, 
                        organização e tranquilidade com o seu dinheiro.</p>
                </div>

                <section>
                    <div>
                        <img />
                        <h4>Controle financeiro</h4>
                        <p>Monitore seus gastos e receitas em tempo real, 
                            com uma interface simples e intuitiva.</p>
                        <FaLongArrowAltRight />
                    </div>

                    <div>
                        <img />
                        <h4>Relatórios inteligentes</h4>
                        <p>Visualize gráficos e análises detalhadas para entender melhor seu dinheiro.</p>
                        <FaLongArrowAltRight />
                    </div>

                    <div>
                        <img />
                        <h4>Categorias flexíveis</h4>
                        <p>Organize seus gastos em categorias personalizadas 
                            e tenha mais controle sobre cada área da sua vida.</p>
                        <FaLongArrowAltRight />
                    </div>

                    <div>
                        <img />
                        <h4>Histórico completo</h4>
                        <p>Acesse todo o seu histórico de transações 
                            e acompanhe sua evolução ao longo do tempo.</p>
                        <FaLongArrowAltRight />
                    </div>
                </section>
            
                <section>
                    <div>
                        <img />
                    </div>

                    <div>
                        <h3>Dê o próximo passo com a FinCast</h3>
                        <p>Comece hoje mesmo a organizar suas finanças 
                            e conquiste seus objetivos com mais facilidade.</p>
                        <Button>Criar conta<FaLongArrowAltRight /></Button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;