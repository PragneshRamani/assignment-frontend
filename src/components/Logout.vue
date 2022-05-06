<template>
    <div class="about">
        <div class="container">
            Logging out..
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Logout',
    computed: {
        ...mapGetters([
            'logout',
        ])
    },
    methods:{
        init() {
            if (localStorage.getItem('token')) {
                this.logout();
            } else {
                this.$router.push("/login")
            }
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped>
</style>
