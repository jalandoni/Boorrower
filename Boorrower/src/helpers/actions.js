import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

//action for SERVICES

//action for APPOINTMENTS
export function getBorrower() {
    return axios.get(`${BASE_URL}/api/borrower/list`)
        .then(response => response.data)
}

export function getBorrowerDone() {
    return axios.get(`${BASE_URL}/api/borrower/getDone`)
        .then(response => response.data)
}

export function deleteBorrower(id) {
    return axios.post(`${BASE_URL}/api/borrower/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message))
}

export function createBorrower(data) {
    return axios.post(`${BASE_URL}/api/borrower/create`, {
            firstname: data.firstname,
            lastname: data.lastname,
            bookId:data.bookId,
            title:data.title,
            dueDate:data.dueDate,
            borrowedDate:data.borrowedDate,
            status: data.status,
            action: data.action,
        })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}





export function updateBorrower(data, id) {
    return axios.post(`${BASE_URL}/api/borrower/update/${id}`, { data })
        .then(response => {
            return response.data
       
        })
        .catch(err => Promise.reject(err.message))
}

export function updateNote(data, id) {
    return axios.post(`${BASE_URL}/api/note/update/${id}`, { data })
            .then(response => {
                    return response.data
            })
            .catch(err => Promise.reject(err.message));
}


//Admin - Account
export function getAccount() {
    return axios.get(`${BASE_URL}/api/account/retrieve`)
        .then(response => response.data)
}

export function deleteAccount(id) {
    return axios.post(`${BASE_URL}/api/account/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function createAccount(data) {
    return axios.post(`${BASE_URL}/api/account/create`, { username: data.username, password: data.password })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updateAccount(data, id) {
    return axios.post(`${BASE_URL}/api/account/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}


export function login(data) {
    return axios.post(`${BASE_URL}/api/admin/login`, {
            username: data.username,
            password: data.password,
        })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}

export function getuser(data) {
    return axios.get(`${BASE_URL}/api/admin/get`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}












