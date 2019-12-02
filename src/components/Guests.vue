<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="guests" :options="options">
                <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteGuest(props.row._id)"></a>
            </v-client-table>
        </div>
    </div>
</template>

<script>
    import hotelservice from "@/services/hotelservice";
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

    export default {
        name: 'guests',
        data () {
            return {
                messagetitle: ' guests ',
                guests: [],
                errors: [],
                columns: ['name', 'people', 'roomno', 'breakfast', 'roomtype', 'check', 'remove'],
                options: {
                    headings: {
                        name: 'name',
                        people: 'people',
                        roomno: 'roomno',
                        breakfast: 'breakfast',
                        roomtype: 'roomtype',
                        check: 'check'
                    }
                }
            }
        },
        created () {
            this.loadGuests()
        },
        methods: {
            loadGuests: function () {
                hotelservice.fetchGuests()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.guests = response.data;
                        // eslint-disable-next-line no-console
                        console.log(this.guests)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            },
            deleteGuest: function (id) {
                hotelservice.deleteGuest(id)
                    .then(response => {
                        this.loadDonations()
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }

    #app1 {
        width: 80%;
        margin: 0 auto;
    }
</style>