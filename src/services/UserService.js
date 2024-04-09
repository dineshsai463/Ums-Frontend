import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users';

export const listUsers = () => axios.get(REST_API_BASE_URL);

export const addUser = (userData) => axios.post(API_BASE_URL, userData);

export const getUser = (userId) => axios.get(REST_API_BASE_URL + '/' + userId);

export const editUser = (userId, updatedUserData) => axios.put(`${API_BASE_URL}/${userId}`, updatedUserData);

export const deleteUser = (userId) => axios.delete(REST_API_BASE_URL + '/' + userId);