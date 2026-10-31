export const formateCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency',
    }).format(value);
};

export function currencyPorccentage(valuePrev: number, valueCurrent: number) {
    if(valuePrev !== 0) {
    const sub = valueCurrent - valuePrev;
    return ((sub / Math.abs(valuePrev)) * 100).toFixed(2) + '%';
    } else {
        return '0.00';
    };
};

export const formateDate = (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('pt-BR').format(dateObj);
};