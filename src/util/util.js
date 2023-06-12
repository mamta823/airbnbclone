const convertCurrency = (rate) => {

    const sign = rate
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const formatedValue = USDollar.format(sign)
    if (formatedValue) {
        return formatedValue
    } else {
        return ""
    }
}
export default convertCurrency