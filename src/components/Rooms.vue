<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="rooms" :options="options">
                <a slot="ready" slot-scope="props" class="fa fa-check fa-2x" @click="readyRooms(props.row._id)"></a>
                <a slot="maintain" slot-scope="props" class="fa fa-gear fa-2x" @click="maintainRooms(props.row._id)"></a>
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
        name: 'rooms',
        data () {
            return {
                messagetitle: ' rooms ',
                rooms: [],
                errors: [],
                props: ['_id'],
                columns: ['number', 'roomtype', 'capacity', 'state', 'guest','ready', 'maintain'],
                options: {
                    headings: {
                        number: 'number',
                        roomtype: 'roomtype',
                        capacity: 'capacity',
                        state: 'state',
                        guest: 'guest'
                    }
                }
            }
        },
        created () {
            this.loadRooms()
        },
        methods: {
            loadRooms: function () {
                hotelservice.fetchRooms()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.rooms= response.data;
                        // eslint-disable-next-line no-console
                        console.log(this.rooms)
                    })
                    .catch(error => {
                        this.errors.push(error);
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            },
            // deleteGuest: function (id) {
            //     hotelservice.deleteGuest(id)
            //         .then(response => {
            //             this.loadDonations()
            //         })
            //         .catch(error => {
            //             this.errors.push(error)
            //             console.log(error)
            //         })
            // }
            readyRooms: function (id) {
                hotelservice.readyRooms(id)
                    .then(response => {
                        console.log(response);
                        this.loadRooms();
                        alert("Room is now ready");
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            maintainRooms: function (id) {
                hotelservice.maintainRooms(id)
                    .then(response => {
                        console.log(response);
                        this.loadRooms();
                        alert("Room sent for maintenance");
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

    assign{
        visibility: hidden;
    }
</style>