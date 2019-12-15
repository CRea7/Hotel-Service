<template>
    <bar-chart :chartdata="chartData" :options="chartOptions"/>
</template>
<script>
    import Vue from 'vue'
    import { Bar } from "vue-chartjs";
    import hotelservice from "@/services/hotelservice";

    Vue.use(Bar)

    export default {
        extends: Bar,
        rooms: [],
        props: ['options'],
        data: () => ({
            loaded: false,
            chartdata: null
        }),
        mounted() {
            this.loadRooms();
            //this.renderChart(this.datacollection);
        },
        methods: {
            fillData () {
                this.datacollection = {
                    labels: ['Ready','Occupied'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [this.roomStats(), 0]
                        }
                    ]
                }
            },

            loadRooms: function () {
                hotelservice.fetchRooms()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.rooms= response.data;

                    })
                    .catch(error => {
                        //this.errors.push(error);
                        window.location.href = '/#/users/login';
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            },
            getRandomInt () {
                var num = this.ready
                console.log(this.ready)
                return num
            },
            roomStats: function () {
                 var readyRoom = 0;
                var maintainRoom = 0;
                var cleanRooms = 0;
                 var occupiedRooms = 0;

                var rooms = this.rooms
                var number = rooms.count()
                for(var i = 0; i < number; i++){
                    if(rooms[i].state === 'Ready')
                    {
                        readyRoom++;
                    }
                }
                this.ready = readyRoom;
                return readyRoom
            }
        }
    };
</script>
<style>
    .hero {
        height: 100vh;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .hero .lead {
        font-weight: 200;
        font-size: 2.5rem;
    }
    #app1 {
        width: 60%;
        margin: 0 auto;
    }
    .vue-title {
        font-size: 70pt;
        margin-bottom: 10px;
    }
</style>
