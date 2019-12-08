<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="guests" :options="options">
                <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteGuest(props.row._id)"></a>
                <a slot="assign" id="assign" slot-scope="props" class="fa fa-plus fa-2x" @click="assignGuest(props.row._id)"></a>
                <a slot="checkout" id="check" slot-scope="props" class="fa fa-minus fa-2x" @click="checkoutGuest(props.row._id)"></a>
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
                props: ['_id'],
                option: ['check'],
                columns: ['name', 'people', 'roomno', 'breakfast', 'roomtype', 'check', 'remove', 'assign', 'checkout'],
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
            assignGuest: function (id) {
                hotelservice.assignGuest(id)
                    .then(response => {
                        console.log(response);
                        this.loadGuests();
                        alert("Guest has been assigned room")
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            checkoutGuest: function (id) {
                hotelservice.checkoutGuest(id)
                    .then(response => {
                        console.log(response);
                        this.loadGuests();
                        alert("Guest has been checked out")
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            deleteGuest: function (id) {
                this.$swal({
                    title: 'Are you totaly sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK Delete it',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result);
                    if (result === true) {
                         hotelservice.deleteGuest(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data;
                                console.log(this.message);
                                this.loadGuests();
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Donation ' + JSON.stringify(response.data, null, 5), 'success')
                            })
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                                this.errors.push(error);
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'Your Donation still Counts!', 'info')
                    }
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