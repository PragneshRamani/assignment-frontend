<template>
    <div class="main-todo">
        <div class="container">
            <div class="shadow p-3 mb-5 bg-white rounded">
                <ManageToDoItem
                    :users="users"
                    @fetchTransactions="fetchTransactions"
                />
            </div>
            <div class="shadow p-3 mb-5 bg-white rounded">
                <ToDoItems
                    :taskList="transactionList"
                    :fields="fields"
                    @handleMarkPaid="handleMarkPaid"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { get as _get } from 'lodash';
import ToDoItems from './ToDoItems';
import ManageToDoItem from './ManageToDoItem';
import axios from '../axiosUrl'

Vue.use(VueSweetalert2)

export default {
    name: 'Transactions',
    props: {
        msg: String
    },
    components: {
        ToDoItems,
        ManageToDoItem
    },
    mounted() {
        if (!localStorage.getItem('token')) {
            this.$router.push("/login")
        } else {
            this.getUsers();
            this.fetchTransactions();
        }
    },
    methods: {
        getUsers: async function() {
            const token = localStorage.getItem('token');
            return await axios.get(`api/get_users/`, {
                headers: {
                  'Authorization': `Token ${token}`
                },
            })
            .then(res => {
                this.users = _get(res, "data.result", [])
                console.log(this.users);
                return res
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        fetchTransactions: async function() {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            return await axios.get(`api/get_transactions/?username=${username}`, {
                headers: {
                  'Authorization': `Token ${token}`
                },
            })
            .then(res => {
                console.log(_get(res, "data.transactions", []));
                this.transactionList = _get(res, "data.transactions", [])
                return _get(res, "data.transactions", [])
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        handleMarkPaid: async function(item) {
            const token = localStorage.getItem('token');
            return await axios.post(`api/mark_paid/${item.transaction_id}/`, {},{
                headers: {
                  'Authorization': `Token ${token}`
                },
            })
            .then(() => {
                Vue.swal("Success", "Transaction marked successfully", 'success');
                this.fetchTransactions();
            })
            .catch((error)=>{
                console.log(error)
                Vue.swal("Success", error.message, 'success');
            })
        }
    },
    data() {
        return {
            transactionList: [],
            users: [],
            fields: [
                { key: 'is_completed', label: ''},
                { key: 'transaction_id', label: '#', sortable: false},
                { key: 'transaction_from', label: 'From', sortable: false},
                { key: 'transaction_with', label: 'With', sortable: false},
                { key: 'transaction_type', label: 'Type', sortable: false},
                { key: 'transaction_status', label: 'Status', sortable: true},
                { key: 'transaction_date', label: 'Date', sortable: true},
                { key: 'reason', label: 'Reason', sortable: false},
                { key: 'Action', label: 'Action'}
            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main-todo {
    margin-top: 50px;
}
h4 {
    color: #333;
    text-transform: uppercase;
    text-align: left;
}
.strike-line {
    text-decoration: line-through !important;
}
.pagination > li > a
{
    background-color: white !important;
    color: #17a2b8 !important;
}
.pagination > li > a:hover,
.pagination > li > span:hover
{
    color: #5a5a5a !important;
    background-color: #eee !important;
    border-color: #ddd !important;
}
.pagination > .active > a
{
    color: white !important;
    background-color: #17a2b8 !important;
    border: solid 1px #17a2b8 !important;
}
.pagination > .active > a:hover
{
    background-color: #17a2b8 !important;
    border: solid 1px #17a2b8 !important;
}
</style>
