<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">

                    <form @submit.prevent="submit">
                        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                            <label class="form__label">Name</label>
                            <input class="form__input" data-test="user" v-model.trim="$v.name.$model"/>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                            <label class="form_label" >Password</label>
                            <input class="form__input, passInput" data-test="password" type="password" v-model.trim="password"/>
                        </div>
                        <p>
                            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
                        </p>
                        <p class="typo__p" v-if="submitStatus === 'OK'">Logged In!</p>
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
        name: "Login",
        data() {
            return {
                messagetitle: ' Login ',
                name: '',
                password: '',
                user: {},
                submitStatus: null
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            password: {
                required,
                minLength: minLength(3)
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
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK';
                        var user = {
                            name: this.name,
                            password: this.password
                        };
                        this.user = user;
                        // eslint-disable-next-line no-console
                        //console.log('Submitting in DonationForm : ' + JSON.stringify(this.guest, null, 5))
                        this.submitGuest(this.user)
                    }, 500)
                }
            },
            submitGuest: function (user) {
                hotelservice.loginUsers(user)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response)
                        window.location.href = '/#/#';
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



<!--submit() {-->
<!--// eslint-disable-next-line no-console-->
<!--console.log('submit!');-->
<!--this.$v.$touch();-->
<!--if (this.$v.$invalid) {-->
<!--this.submitStatus = 'ERROR'-->
<!--} else {-->
<!--// do your submit logic here-->
<!--this.submitStatus = 'PENDING';-->
<!--setTimeout(() => {-->
<!--this.submitStatus = 'OK';-->
<!--var user ={-->
<!--name: this.name,-->
<!--password: this.password,-->
<!--};-->
<!--this.user = user;-->
<!--// eslint-disable-next-line no-console-->
<!--//console.log('Submitting in DonationForm : ' + JSON.stringify(this.guest, null, 5))-->
<!--this.submitGuest(this.user)-->
<!--}, 500)-->
<!--}-->
<!--},-->
<!--submitGuest: function (user) {-->
<!--hotelservice.loginUsers(user)-->
<!--.then(response => {-->
<!--console.log(response)-->
<!--})-->
<!--.catch(error => {-->
<!--this.errors.push(error)-->
<!--})-->
<!--}-->