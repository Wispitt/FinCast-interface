import { BrowserRouter, Link, Route, Routes } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthProvider } from "../hooks/AuthContext";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from './PrivateRoutes'
import AppLayout from "../layout/AppLayout";
import Transactions from "../pages/Transactions";
import { ToastContainer, type ToastContainerProps } from "react-toastify";

const AppRoutes = () => {

    const toastConfig: ToastContainerProps = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark',
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<PrivateRoutes />}>
                        <Route element={<AppLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/transacoes" element={<Transactions />} />
                        </Route>
                    </Route>

                    <Route path="*" element={
                    <div className="w-full h-[99vh] flex justify-center items-center">
                        <div className="flex flex-col gap-4 p-3 border-2 border-[#075985] rounded-2xl w-full max-w-120">
                            <h1 className="text-2xl text-center text-primary-600 font-bold">Página não encontrada</h1>
                            <Link className="h-10 p-3 border border-[#075985] rounded-2xl flex justify-center items-center text-xl text-[#00C9F2] hover:opacity-80" to='/dashboard'>Ir para home</Link>
                        </div>
                    </div>} />
                </Routes>
                <ToastContainer {...toastConfig} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes