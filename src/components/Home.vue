<script>
    import Vue from 'vue'
    import { Bar } from "vue-chartjs";
    import hotelservice from "@/services/hotelservice";

    Vue.use(Bar);

    export default {
        extends: Bar,
        rooms: [],
        props: ['labels', 'data'],
        number: null,
        data() {
            return {
                number: this.roomStats()
            };
        },
        computed: {
            'chartdata': function () {
                return {
                    labels: ['Ready', 'Clean', 'Maintain', 'Occupied'],
                    datasets: [
                        {
                            label: 'Room status',
                            backgroundColor: 'darkcyan',
                            data: [3, 5, 2, 6]
                        }
                    ]
                }
            }
        },

        mounted() {
            this.loadRooms();
            this.renderChart(this.chartdata,
                {responsive: true, maintainAspectRatio: false})
        },
        methods: {

            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            },
            loadRooms: function () {
                hotelservice.fetchRooms()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.rooms= response.data;
                        //this.roomStats()
                    })
                    .catch(error => {
                        //this.errors.push(error);
                        window.location.href = '/#/users/login';
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            },
            roomStats: function () {
                 var readyRoom = 0;
                var maintainRoom = 0;
                var cleanRooms = 0;
                 var occupiedRooms = 0;

                var rooms = this.rooms
                for(var i = 0; i < rooms.length; i++){
                    if(rooms[i].state === 'Ready')
                    {
                        readyRoom++;
                    }
                }
                console.log(readyRoom);
                this.number = readyRoom;
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
