const convertCurrency = (rate) => {

    const sign = rate
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    if (sign) {
        const formatedValue = USDollar.format(sign)
        if (formatedValue) {
            return formatedValue
        } else {
            return ""
        }
    } else {
        return ""
    }


}
export default convertCurrency