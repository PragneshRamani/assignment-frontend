<template>
    <div class="add-todo">
        <h4>Add Transactions</h4>
        <b-row>
            <b-col lg="6" class="pb-2">
                <label>Transaction With</label>
                <b-form-select
                    v-model="selectedUser"
                    :options="users"
                    class="mb-3"
                    value-field="id"
                    text-field="username"
                    disabled-field="notEnabled"
                    @change="validateSelectedUser"
                >
                </b-form-select>
                <div class="float-left text-red mt5" v-if="selectedUserError">Please Select User!</div>
            </b-col>
            <b-col lg="6" class="pb-2">
                <label>Transaction Type</label>
                <b-form-select
                    v-model="selectedTransactionType"
                    :options="transactionTypes"
                    class="mb-3"
                    disabled-field="notEnabled"
                    @change="validateSelectedTransactionType"
                >
                </b-form-select>
                <div class="float-left text-red mt5" v-if="selectedTransactionTypeError">Please Select Transaction Type!</div>
            </b-col>
            <b-col lg="6" class="pb-2">
                <label>Transaction Date</label>
                <b-form-datepicker id="example-datepicker"
                    v-model="transactionDate"
                    class="mb-2"
                    @change="validateTransactionDate"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }">
                </b-form-datepicker>
                <div class="float-left text-red mt5" v-if="transactionDateError">Please Enter Transaction Date!</div>
            </b-col>
            <b-col lg="6" class="pb-2">
                <label>Reason</label>
                <b-form-input
                    v-model="transactionReason"
                    placeholder="Enter Transaction Reason"
                    @keyup="validateTransactionReason">
                </b-form-input>
                <div class="float-left text-red mt5" v-if="transactionReasonError">Please Enter Transaction Reason!</div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="1" class="pb-2">
                <b-button 
                    variant="outline-info"
                    @click="handleItem"
                    pill>
                    {{this.$store.state.isEdit ? 'Edit' : 'Add'}}
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import axios from '../axiosUrl'

Vue.use(VueSweetalert2)

export default {
    name: 'ManageToDoItem',
    props: {
        users: Array,
    },
    data() {
        return {
            selectedUser: '',
            selectedUserError: false,
            transactionDate: '',
            transactionDateError: false,
            selectedTransactionType: '',
            selectedTransactionTypeError: false,
            transactionTypes: [
                {
                    value: 'Borrows',
                    text: 'Borrows'
                },
                {
                    value: 'Lendes',
                    text: 'Lendes'
                }
            ],
            transactionReason: '',
            transactionReasonError: false
        }
    },
    methods: {
        validateTransactionDate: function() {
            if (!this.transactionDate) {
                this.transactionDateError = true
                return true
            }
            this.transactionDateError = false
            return false
        },
        validateSelectedUser: function() {
            if (!this.selectedUser) {
                this.selectedUserError = true
                return true
            }
            this.selectedUserError = false
            return false
        },
        validateSelectedTransactionType: function() {
            if (!this.selectedTransactionType) {
                this.selectedTransactionTypeError = true
                return true
            }
            this.selectedTransactionTypeError = false
            return false
        },
        validateTransactionReason: function() {
             if (!this.transactionReason) {
                this.transactionReasonError = true
                return true
            }
            this.transactionReasonError = false
            return false
        },
        validateAddTransactionForm: function() {
            console.log(this.selectedTransactionType);
            console.log(this.selectedUser);
            if (!this.selectedUser) {
                this.selectedUserError = true
                return true
            }
            if (!this.selectedTransactionType) {
                this.selectedTransactionTypeError = true
                return true
            }
            if (!this.transactionDate) {
                this.transactionDateError = true
                return true
            }
            if (!this.transactionReason) {
                this.transactionReasonError = true
                return true
            }
            this.transactionReasonError = false
            this.selectedTransactionTypeError = false
            this.selectedUserError = false
            this.transactionDateError = false
            return false
        }, 
        handleItem: async function() {
            const isError = this.validateAddTransactionForm();
            if (isError) {
                return false
            }

            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const transactionData = {
                username: username,
                transaction_type: this.selectedTransactionType,
                transaction_status: 'Unpaid',
                transaction_with: this.selectedUser,
                transaction_date: this.transactionDate,
                reason: this.transactionReason
            }
            console.log(transactionData);
            return await axios.post(`api/add_transactions/`, transactionData,{
                headers: {
                  'Authorization': `Token ${token}`
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                    Vue.swal("Success", "Transaction added successfully", 'success');
                    this.selectedUser = ''
                    this.transactionDate = ''
                    this.selectedTransactionType = ''
                    this.transactionReason = ''
                    this.$emit('fetchTransactions')
                } else {
                    Vue.swal("Error", res.data.message, 'error');
                }
            })
            .catch((error)=>{
                console.log(error)
                Vue.swal("Error", error.message, 'error');
            })
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
