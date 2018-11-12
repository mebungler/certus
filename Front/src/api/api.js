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
    operation: {
        get: credentials =>
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
    equipment: {
        add: credentials =>
            axios
                .post(url + "/api/equipment", credentials)
                .then(res => res)
                .catch(err => err.response),
        get: credentials =>
            axios
                .get(url + "/api/equipment", credentials)
                .then(res => res)
                .catch(err => err.response),
        getAll: () =>
            axios.get(url + "/api/equipment").then(res => {
                return res
            }).catch(err => err.response)
    },
    model: {
        add: (credentials) =>
            axios
                .post(url + "/api/model", credentials)
                .then(res => res)
                .catch(err => err.response),
        getAll: (credentials) =>
            axios.get(url + "/api/model", credentials).then(res => {
                return res
            }).catch(err => err.response),
        preGetAll: (credentials) =>
            axios.get(url + "/api/pre/model", credentials).then(res => {
                return res
            }).catch(err => err.response)

    },
    customer: {
        get: (credentials) =>
            axios.get(url + "/api/product/" + credentials)
                .then(res => res)
                .catch(err => err.response),
        add: (credentials) =>
            axios.post(url + "/api/customer", credentials)
                .then(res => res)
                .catch(err => err.response),
        getAll: () =>
            axios.get(url + "/api/customer").then(res => {
                return res
            }).catch(err => err.response),
        preGetAll: (credentials) =>
            axios.get(url + "/api/pre/customer", credentials).then(res => {
                return res
            }).catch(err => err.response)
    },
    order: {
        add: (credentials) =>
            axios.post(url + "/api/order", credentials)
                .then(res => res)
                .catch(err => err.response),
        getAll: () =>
            axios.get(url + "/api/order").then(res => {
                return res
            }).catch(err => err.response),
        preGetAll: (credentials) =>
            axios.get(url + "/api/pre/order", credentials).then(res => {
                return res
            }).catch(err => err.response),
        update:(credentials)=>
            axios.put(url+"/api/order",credentials)
                .then(res => res)
                .catch(err => err.response)
    },
    finishedOperation: {
        add: (credentials) =>
            axios.post(url + "/api/finishedoperation", credentials)
                .then(res => res)
                .catch(err => err.response),
        getAll: () =>
            axios.get(url + "/api/finishedoperation").then(res => {
                return res
            }).catch(err => err.response),
        preGetAll: (credentials) =>
            axios.get(url + "/api/pre/finishedoperation", credentials).then(res => {
                return res
            }).catch(err => err.response)
    }

}
