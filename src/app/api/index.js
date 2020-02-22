import axios from 'axios';
import { dispatch } from '../store';
import { actions } from '../reducers/data';
const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFail
} = actions
export const API_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
    dispatch(fetchUsersStart())
    try {
        const response = await axios.get(`${API_URL}/users`);
        dispatch(fetchUsersSuccess(response.data));
    }
    catch (error) {
        dispatch(fetchUsersFail())
        console.log(error)
    }
};
