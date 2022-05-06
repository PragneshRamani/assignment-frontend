import axios from 'axios';

const instance = axios.create({
    baseURL:"https://assignmentdjangobackend.pythonanywhere.com/"
});

export default instance;
