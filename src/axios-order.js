import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5b83d.firebaseio.com/',
});

export default instance;
