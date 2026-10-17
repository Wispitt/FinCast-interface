import { useEffect } from "react";
import { api } from "../services/api";


const Dashboard = () => {

    useEffect(() => {
        async function getTransactions() {
            const response = await api.get('/transactions')
        }

    getTransactions()
    }, [])

    return (
        <div>
            <h1>Ola Dash</h1>
        </div>
    )
}

export default Dashboard;