<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">

                    <form @submit.prevent="submit">
                        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                            <label class="form__label">Name of guest</label>
                            <input class="form__input" v-model.trim="$v.name.$model"/>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.people.$error }">
                            <div class="error" v-if="!$v.people.between">guests must be between 1 and 6</div>
                            <label class="form-control-label" name="people">Number of guests</label>
                            <input class="form__input" type="number" v-model.trim="people"/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Select Room Type</label>
                            <select id="roomtype" name="roomtype" class="form-control" type="text" v-model="roomtype">
                                <option value="null" selected disabled hidden>Choose Room Type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Select Breakfast</label>
                            <select id="breakfast" name="breakfast" class="form-control" type="text" v-model="breakfast">
                                <option value="null" selected disabled hidden>Select Breakfast</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <p>
                            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Make Reservation</button>
                        </p>
                        <p class="typo__p" v-if="submitStatus === 'OK'">Reservation recived!</p>
                        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
                        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending</p>
                    </form>
                </div><!-- /col -->
            </div><!-- /row -->
        </div><!-- /container -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'
    import hotelservice from "@/services/hotelservice";
    import { required, minLength, between } from 'vuelidate/lib/validators';

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    });

    Vue.use(Vuelidate);
    Vue.use(VueSweetalert);

    export default {
        name: "GuestAdd",
        data() {
            return {
                messagetitle: ' GuestAdd ',
                name: '',
                people: 0,
                roomno: 0,
                breakfast: '',
                roomtype: '',
                guest: {},
                submitStatus: null
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            people: {
                required,
                between: between(1, 6)
            }
        },

        methods: {
            submit() {
                // eslint-disable-next-line no-console
                console.log('submit!');
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK';
                        var guest = {
                            name: this.name,
                            people: this.people,
                            roomno: this.roomno,
                            breakfast: this.breakfast,
                            roomtype: this.roomtype
                        };
                        this.guest = guest;
                        // eslint-disable-next-line no-console
                        //console.log('Submitting in DonationForm : ' + JSON.stringify(this.guest, null, 5))
                        this.submitGuest(this.guest)
                    }, 500)
                }
            },
            submitGuest: function (guest) {
                //console.log('submitguest!')
                //console.log('Submitting in submitGuest : ' + guest)
                hotelservice.postGuests(guest)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        //console.log(error)
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
        width: 95%;
        margin: 0 auto;
    }
    .required-field > label::after {
        content: '*';
        color: red;
        margin-left: 0.25rem;
    }
    .donate-form .form-control-label.text-left{
        text-align: left;
    }

    label {
        display: inline-block;
        width: 540px;
        text-align: left;
        font-size: x-large;
    }
    .typo__p {
        width: 540px;
        font-size: x-large;
    }
    .btn1 {
        width: 300px;
        font-size: x-large;
    }
    p {
        margin-top: 20px;
    }

    input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
        width: 540px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #157ffb;
        color: whitesmoke;
    }

    .error:focus {
        outline-color: #ffa519;
    }
</style>