import { FaArrowRight, FaLock, FaRegUser } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import GoogleLoginButton from "../components/GoogleLoginButton";


const Login = () => {
    return (
        <div className="h-screen ">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="text-center">
                    <h1 className="text-[45px] font-bold">Bem-vindo ao <span className="text-primary-500 font-extrabold">FinCast!</span></h1>
                    <p className=" max-w-110 text-center text-sm text-gray-400">Conecte sua conta e tenha acesso a todos os recursos para cuidar melhor do seu dinheiro.</p>
                </div>

                <main className="border-2 border-primary-400 bg-[#051817] h-90 max-sm:h-110 max-w-140 rounded-3xl mt-8 mx-2">
                    <section className="m-8 mt-5 flex flex-col ">
                        <div className="mb-5 h-7 border-2 border-primary-400 w-38 rounded-full flex gap-1 justify-center items-center">
                            <FaLock className="text-sm text-primary-400" />
                            <p className="text-sm text-primary-400">Acesso seguro</p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                                <FaRegUser className="text-primary-400 text-5xl bg-[#062D2B] border-b-2 border-t-2 py-2 rounded-full mx-5 mb-auto"/>
                            <div>
                                <h2 className="text-2xl font-bold">Acesse sua conta</h2>
                                <p className="max-w-100 text-sm text-gray-400">Entre com o Google para continuar de forma rápida, segura e sem complicação.</p>
                            </div>
                        </div>
                            <GoogleLoginButton className="my-6 h-13 text-[18px] font-medium group">Entrar com Google<FaArrowRight className="ml-2 text-1xl transition-transform duration-800 ease-in-out group-hover:translate-x-2" /></GoogleLoginButton>
                        <div className="w-full text-center">
                            <span className="line-after-before">ou</span>
                        </div>
                        <div className="flex gap-4 items-center mt-5 ml-3">
                            <FaShieldHalved className="text-3xl max-sm: text-primary-400 "/>
                            <p className="max-w-100 text-sm text-gray-400">Seus dados estão seguros conosco. Respeitamos sua privacidade e não compartilhamos suas informações.</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Login;