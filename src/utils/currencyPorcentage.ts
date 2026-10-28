export function currencyPorccentage(valuePrev: number, valueCurrent: number) {
    if(valuePrev !== 0) {
    const sub = valueCurrent - valuePrev;
    return ((sub / Math.abs(valuePrev)) * 100).toFixed(2) + '%';
    } else {
        return '0.00';
    };
};