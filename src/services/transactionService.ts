import type { CreateTransactionDTO, MonthlyItem, Transaction, TransactionFilter, TransactionsSummary } from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
    filter?: Partial<TransactionFilter>
): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions', {
        params: filter,
    });

    return response.data;
}

export const getTransactionsSummary = async (
    month: number, 
    year: number,
): Promise<TransactionsSummary> => {
    const reponse = await api.get<TransactionsSummary>('/transactions/summary', {
        params: { month, year},
    });
    return reponse.data;
}

export const getTransactionsMonthly = async (
    month: number, 
    year: number, 
    months?: number,
): Promise<{history: MonthlyItem[]}> => {
    const reponse = await api.get<{history: MonthlyItem[]}>('/transactions/historical', {
        params: { 
            month, 
            year, 
            months
        },
    });
    return reponse.data;
}

export const deleteTransactions = async (
    id: string, 
): Promise<void> => {
    const reponse = await api.delete(`/transactions/${id}`);
    return reponse.data;
}

export const createTransaction = async (
    transactionData: CreateTransactionDTO, 
): Promise<Transaction> => {
    const response = await api.post<Transaction>('/transactions', transactionData);
    return response.data;
}