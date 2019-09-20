import Axios from 'axios'
const token = localStorage.getItem('token');
export default Axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
});