import axios from 'axios';
const url = 'http://localhost:5000/api/';
export default {
    getExchange(amount, from, to) {
        // eslint-disable-next-line no-console
        return axios.get(`${url}convert/${amount}/${from}/${to}`).then(response => response);
    },
    getCurrencies() {
        return axios.get(`${url}currencies`);
    },
    getToCurrencies(currency) { // get call to our back-end to get the list that the requested currency is convertible to
        return axios.get(`${url}currencies/${currency}`);
    },
    addRate(from, to, rate) {
        return axios.post(`${url}new?from=${from}&to=${to}&rate=${rate}`);
    },
    getRate(from, to) {
        return axios.get(`${url}rates/${from}/${to}`);
    },
    updateRate(from, to, rate) {
        return axios.put(`${url}update?from=${from}&to=${to}&rate=${rate}`);
    },
    deleteCurrency(currency) {
        return axios.delete(`${url}delete?currency=${currency}`);
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