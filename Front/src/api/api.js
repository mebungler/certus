import axios from "axios";

export const url = "http://localhost:8080";
export default {
    user: {
        login: credentials =>
            axios
                .post(url + "/api/login", credentials)
                .then(res => res)
                .catch(err => err.response),
        add: credentials =>
            axios
                .post(url + "/api/user", credentials)
                .then(res => res)
                .catch(err => err.response),
        get: () => axios.get(url + "/api/user").then(res => res)
    },
    seamstress: {
        product: credentials =>
            axios
                .get(url + "/api/product/" + credentials)
                .then(res => res)
                .catch(err => err.response),
        addOperation: credentials =>
            axios
                .post(url + "/api/operation", credentials)
                .then(res => res)
                .catch(err => err.response),
        getOperations: () =>
            axios
                .get(url + "/api/operation")
                .then(res => res)
                .catch(err => err.response)
    },
    equipment:{
        add:credentials =>
            axios
                .post(url + "/api/equipment", credentials)
                .then(res => res)
                .catch(err => err.response),
        get:credentials =>
            axios
                .get(url + "/api/equipment", credentials)
                .then(res => res)
                .catch(err => err.response),
    }
};
