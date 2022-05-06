<template>
    <div class="main-todo">
        <div class="container">
            <div class="shadow p-3 mb-5 bg-white rounded">
                <div class="login">
                    <h4>Login</h4>
                    <b-row>
                        <b-col lg="5" class="pb-2">
                            <b-form-input
                                v-model="userName"
                                placeholder="Enter User Name"
                                @keyup="validateUserName">
                            </b-form-input>
                            <div class="float-left text-red mt5" v-if="userNameError">Please Enter username!</div>
                        </b-col>
                        <b-col lg="5" class="pb-2">
                            <b-form-input
                                type="password"
                                v-model="password"
                                placeholder="Enter Password"
                                @keyup="validatePassword">
                            </b-form-input>
                            <div class="float-left text-red mt5" v-if="passwordError">Please Enter password!</div>
                        </b-col>
                        <b-col lg="2" class="pb-2">
                            <b-button 
                                variant="outline-info"
                                @click="handleLogin"
                                pill>
                                Login
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            userName: '',
            password: '',
            userNameError: false,
            passwordError: false,
        }
    },
    computed: {
        ...mapGetters([
            'login'
        ])
    },
    methods: {
        validateUserName: function() {
            if (!this.userName) {
                this.userNameError = true
                return true
            }
            this.userNameError = false
            return false
        },
        validatePassword: function() {
            if (!this.password) {
                this.passwordError = true
                return true
            }
            this.passwordError = false
            return false
        },
        validateLoginForm: function() {
            if (!this.userName) {
                this.userNameError = true
                return true
            }
            if (!this.password) {
                this.passwordError = true
                return true
            }
            this.userNameError = false
            this.passwordError = false
            return false
        }, 
        handleLogin: function() {
            const isError = this.validateLoginForm();
            if (isError) {
                return false
            }
            this.login({ username: this.userName, password: this.password})
            this.userName = '';
            this.password = '';
        }
    }
}
</script>

<style scoped>
    .text-red {
        color: red;
    }
    .mt-8 {
        margin-top: -8px;
    }
    .mt5 {
        margin-top: 5px;
    }
</style>
