<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" class="header-shadow" fixed>
            <b-navbar-brand to="/">{{title}}</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <router-link to="/" v-if="isToken" class="nav-link">Home</router-link>
                    <router-link to="/logout" class="nav-link" v-if="isToken">Logout</router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isToken: localStorage.getItem('token')
        }
    },
    mounted() {
        console.log("Mount")
    },
    computed() {
        console.log("computed")
    },
    props: {
        title: String,
    },
    watch: {
        isToken: function(tasks) {
            this.totalRows = tasks.length
        }
    }
}
</script>

<style scoped>
.router-link-exact-active {
    color: #fff !important;
}
.header-shadow {
    -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
    box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
}
</style>
