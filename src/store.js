import Vue from 'vue'
import Vuex from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2'
import { get as _get } from 'lodash'
import axios from './axiosUrl'
import router from './router'

Vue.use(Vuex)
Vue.use(VueSweetalert2)

export default new Vuex.Store({
    state: {},
    getters: {
        showSuccessMessage: () => (title, msg) => {
            console.log(title, msg)
            return Vue.swal({
                title,
                text: msg,
                icon: "success",
                closeOnClickOutside: false,
                closeOnEsc: false,
                allowOutsideClick: false,
              }).then(function(e) {
                if (e.value) {
                    window.location.reload()
                }
            })
        },
        showErrorMessage: () => (title, msg) => {
            return Vue.swal(title, msg, 'error');
        },
        login: (state, getters) => async (loginData) => {
            return axios.post("api/auth/login/", loginData)
                .then(res => {
                    const token = _get(res, "data.token", "");
                    if (token && res.status === 200) {
                        localStorage.setItem("token", token);
                        localStorage.setItem('username', _get(res, "data.username", ""));
                        router.push("/")
                        getters.showSuccessMessage(
                            'Success',
                            'Login Successfully'
                        );
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    getters.showErrorMessage(
                        'Error',
                        'Username or password invalid!'
                    );
                })
        },
        logout: (state, getters) => async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
                const res = await axios.post("api/auth/logout/", {}, {
                    headers: {
                      'Authorization': `Token ${token}`
                    },
                  })
                if (res.status === 200) {
                    localStorage.removeItem("token")
                    localStorage.removeItem('username');
                    router.push("/")
                    getters.showSuccessMessage(
                        'Success',
                        'Logout Successfull'
                    )
                }
            } catch (error) {
                console.log(error)
                getters.showErrorMessage(
                    'Error',
                    'Something went wrong'
                )
            }
        }
    }
})
