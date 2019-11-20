import axios from 'axios';
const url = 'http://localhost:5000/api/';
export default {
    getExchange(amount, from, to) {
        // eslint-disable-next-line no-console
        return axios.get(`${url}convert/${amount}/${from.toLowerCase()}/${to.toLowerCase()}`).then(response => response);
    },
    getCurrencies() {
        return axios.get(`${url}currencies`).then(response => response);
    },
    getToCurrencies(currency) { // get call to our back-end to get the list that the requested currency is convertible to
        return axios.get(`${url}currencies/${currency.toLowerCase()}`).then(response => response);
    },
    addRate(from, to, rate) {
        return axios.post(`${url}new?from=${from.toLowerCase()}&to=${to.toLowerCase()}&rate=${rate.toLowerCase()}`).then(response => response);
    },
    getRate(from, to) {
        return axios.get(`${url}rates/${from.toLowerCase()}/${to.toLowerCase()}`).then(response => response);
    },
    updateRate(from, to, rate) {
        return axios.put(`${url}update?from=${from.toLowerCase()}&to=${to.toLowerCase()}&rate=${rate}`).then(response => response);
    },
    deleteCurrency(currency) {
        return axios.delete(`${url}delete?currency=${currency.toLowerCase()}`).then(response => response);
    }
    // ,
    // signUp(credentials) {
    //     return axios
    //         .post(url + 'sign-up/', credentials)
    //         .then(response => response.data);
    // },
    // getSecretContent() {
    //     return axios.get(url + 'secret-route/').then(response => response.data);
    // }
};