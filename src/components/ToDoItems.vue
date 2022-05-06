<template>
    <div class="todo-items">
        <div>
            <b-row>
                <b-col lg="4" class="my-3"><h4>Transactions</h4></b-col>
                <b-col lg="4" class="my-3"></b-col>
                <b-col lg="4" class="my-3">
                    <b-input-group size="sm">
                        <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Type to Search"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button 
                                variant="outline-info"
                                :disabled="!filter"
                                @click="filter = ''">
                                Clear
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-table
                sticky-header
                striped hover
                :items="taskList"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"
                @filtered="onFiltered"
                :tbody-tr-class="rowClass"
                show-empty>
                <template v-slot:cell(transaction_from)="data">
                    {{ data.item.transaction_from.username }}
                </template>
                <template v-slot:cell(transaction_with)="data">
                    {{ data.item.transaction_with.username }}
                </template>
                <template v-slot:cell(transaction_date)="data">
                    {{ getTransactionDate(data.item.transaction_date) }}
                </template>
                <template v-slot:cell(action)="data">
                    <div title="Mark Paid">
                        <font-awesome-icon 
                            icon="check-circle"
                            v-show="data.item.transaction_status === 'Unpaid'"
                            :style="{textDecoration: 'none', display: 'inline-block', cursor: 'pointer'}"
                            @click="$emit('handleMarkPaid', data.item)"
                        />
                    </div>
                </template>
                <template v-slot:empty>
                    <h5>There are no transactions.</h5>
                </template>
            </b-table>
            <b-row>
                <b-col class="my-1">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="right"
                        pills
                        class="my-0"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    name: 'ToDoItems',
    props: {
        taskList: Array,
        fields: Array,
    },
    data() {
        return {
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
        }
    },
    methods: {
        rowClass: function(item, type) {
            if (!item || type !== 'row') return
            return ''
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getTransactionDate(date) {
            if (date) {
                return moment(date).format("MM/DD/YYYY");
            } 
            return ""
        }
    },
    watch: {
        taskList: function(tasks) {
            this.totalRows = tasks.length
        }
    }
}
</script>

<style scoped>
    .fa-pencil-alt {
        color: #ffc107;
        cursor: pointer;
    }

    .fa-trash {
        color: #dc3545;
        cursor: pointer;
    }

    .fa-check-circle {
        color: #28a745;
    }
</style>
