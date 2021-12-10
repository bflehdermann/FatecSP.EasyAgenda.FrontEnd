import axios from 'axios';



const instance = axios.create({
  baseURL: 'https://easy-agenda-back.herokuapp.com/api/'

});

const token = localStorage.getItem('token')

const AUTH_TOKEN = 'Bearer '+ token

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance