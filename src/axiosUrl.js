import axios from 'axios';

const instance = axios.create({
    baseURL:"http://assignmentdjangobackend.pythonanywhere.com/"
});

export default instance;
