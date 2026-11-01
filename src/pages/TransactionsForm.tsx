import { useEffect, useId, useState } from "react";
import { getCategories } from "../services/categoryService";
import { TransactionType } from "../types/transactions";
import type { Category } from "../types/category";
import { Card } from "../components/Card";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { useLocation } from "react-router";
import Sidebar from "../components/SideBar";

interface FormDate {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: TransactionType
};

const initialFormData: FormDate = {
    description: '',
    amount: 0,
    date: '',
    categoryId: '',
    type: TransactionType.expense,
}

const TransactionsForm = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormDate>(initialFormData);
    const formId = useId();

    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            const response = await getCategories();
            setCategories(response)
        }

        fetchCategories();
    }, []);

    const handleTransactionType = (itemType: TransactionType ): void => {
        setFormData((prev) => ({ ...prev, type: itemType }))
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <Sidebar urlLocation={location.pathname} />
            <div>
                <section>
                    <h1>Nova Transação</h1>
                    <p>Adicione uma nova movimentação para controlar suas finanças</p>
                </section>

                <main>
                    <div>
                        <img />
                    </div>

                    <div>
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor={formId}>Tipo de Despesas</label>
                                    <TransactionTypeSelector id={formId}
                                    value={formData.type}
                                    onChange={handleTransactionType}
                                    />
                                </div>
                            </form>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TransactionsForm;