import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { getCategories } from "../services/categoryService";
import { TransactionType, type CreateTransactionDTO } from "../types/transactions";
import type { Category } from "../types/category";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import Input from "../components/Input";
import { FaDollarSign } from "react-icons/fa";
import Select from "../components/Select";
import { TbTag } from "react-icons/tb";
import Button from "../components/Button";
import { BiSave } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { createTransaction } from "../services/transactionService";
import { toast } from "react-toastify";
import DatePicker from "./DatePicker";

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
};

interface ActiveForm {
    active: boolean;
    deactivate: () => void;
}

const TransactionsForm = ({ active, deactivate }: ActiveForm) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormDate>(initialFormData);
    const [error, setError] = useState<string>('');
    const formId = useId();

    const closeSideBar = () => {
		deactivate();
	};

    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            const response = await getCategories();
            setCategories(response)
        }

        fetchCategories();
    }, []);

    const filteredCategoty = categories.filter((category) => category.type === formData.type);

    const validadeForm = (): boolean => {
        if (!formData.description || !formData.amount || !formData.date || !formData.categoryId) {  
            setError('Preencha todos os campos');
            return false;
        } if (formData.amount <= 0) {
            setError('O valor deve ser maior que "0"');
            return false;
        }
    return true;
    };

    const handleTransactionType = (itemType: TransactionType ): void => {
        setFormData((prev) => ({ ...prev, type: itemType }));
    };

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        setError('');

        try {
            if (!validadeForm()) {
                return;
            }
            const transactionData: CreateTransactionDTO = {
                description: formData.description,
                amount: Number(formData.amount),
                categoryId: formData.categoryId,
                type: formData.type,
                date: new Date(formData.date).toISOString(),
            };

            await createTransaction(transactionData);
            toast.success('Transação adicionada com sucesso!');
            setFormData(initialFormData);
        } catch {
            toast.error('Falha ao adicionar transação');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (formData) {
            setError('')
        }
    };

    return (
            <div className="fixed w-full max-w-470 h-full -top-16 min-[1206px]:left-27 flex justify-center items-center z-99">
                {active && (
                <div className="flex flex-col justify-center items-center relative w-full max-w-170 p-10 my-5 bg-[#031727] border border-[#075985] rounded-2xl">
                    <div className="absolute right-5 top-5">
                        <CgClose onClick={closeSideBar} className="cursor-pointer text-4xl hover:bg-gray-700 p-1 rounded-full" />
                    </div>
                    <section className="w-full flex flex-col justify-start ml-7">
                        <h1 className="text-3xl font-extrabold">Nova Transação</h1>
                        <p className="text-gray-500 mb-4 text-sm">Adicione uma nova movimentação para controlar suas finanças</p>
                    </section>

                    <main className="w-full">
                        <div>
                            <div className="flex flex-col justify-center items-center">
                                <form onSubmit={handleSubmit} className="rounded-3xl px-3 py-4 w-full h-full flex flex-col justify-center">
                                    <div className="mb-10 flex flex-col gap-1">
                                        <label htmlFor={formId} className="ml-2 text-gray-300">Tipo de Transação</label>
                                        <TransactionTypeSelector id={formId}
                                        value={formData.type}
                                        onChange={handleTransactionType}
                                        />
                                    </div>

                                    <Input 
                                    label="Descrição:"
                                    fullWidth
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Ex: Compra de roupas, Salário, Móveis..."
                                    />

                                    
                                    <label className="mt-4 ml-2 text-gray-500">Data:</label>
                                    <DatePicker
                                        value={formData.date}
                                        onChange={(date) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                date,
                                            }))
                                            setError("")
                                        }} />
                                        
                                    <label className="mt-4 ml-2 text-gray-500">Valor:</label>
                                    <Input 
                                    className="[appearance:textfield]
                                    [&::-webkit-inner-spin-button]:appearance-none
                                    [&::-webkit-outer-spin-button]:appearance-none pl-7"
                                    fullWidth
                                    name="amount"
                                    type="number"
                                    step='0.01'
                                    value={formData.amount || ''}
                                    onChange={handleChange}
                                    placeholder="R$ 0,00"
                                    icon={<FaDollarSign />}
                                    />
                                    
                                    <label className="mt-4 mb-1 ml-2 text-gray-500">Categoria:</label>
                                    <Select 
                                        name='categoryId'
                                        icon={<TbTag className="text-xl z-1 text-gray-400" />}
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Selecione uma categoria' },
                                            ...filteredCategoty.map((category) => ({
                                                value: category.id,
                                                label: category.name
                                            }))
                                        ]}
                                    />

                                    {error && (
                                        <div className="flex items-center h-1 bg-red-300 border border-red-700 rounded-xl p-3 mt-2 gap-2">
                                            <FiAlertCircle className="text-xl text-red-600" />
                                            <p className="text-red-600"> {error} </p>
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-3 mt-3">
                                        <Button variant='outline' onClick={closeSideBar}>Cancelar</Button>
                                        <Button variant={formData.type === TransactionType.expense 
                                        ? 'danger' : 'success' } 
                                        className="w-35" type="submit">
                                        <BiSave className="text-xl mr-1" />Salvar</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
                )}
            </div>
            
    );
};

export default TransactionsForm;