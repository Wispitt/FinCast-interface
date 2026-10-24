export function currencyPorccentage(valuePrev: number, valueCurrent: number) {
    if(valuePrev !== 0) {
    const sub = valueCurrent - valuePrev;
    const porcentage = (sub / Math.abs(valuePrev)) * 100;
    return porcentage.toFixed(2) + '%';
    } else {
        return '0.00';
    };
};