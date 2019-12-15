<template>
  <div id="app">
    <b-navbar id="nav" toggleable="md" >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Hotel Manager</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/Guests"><i class="fa fa-list" style="padding: 5px">Guests</i></b-nav-item>
          <b-nav-item to="/Add"><i class="fa fa-list" style="padding: 5px">Add</i></b-nav-item>
          <b-nav-item to="/Rooms"><i class="fa fa-list" style="padding: 5px">Rooms</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/users/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/users/logout"><i class="fa fa-sign-out" style="padding: 5px" @click="logoutUsers"> Logout </i></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
  import hotelservice from "@/services/hotelservice";

export default {
  name: 'app',

  methods: {
    logoutUsers: function (id) {
      hotelservice.logoutUsers(id)
              .then(response => {
                console.log(response);
                window.location.href = '/#/users/login';
                alert("Logged out");
              })
              .catch(error => {
                this.errors.push(error)
                console.log(error)
              })
    }
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-decoration-color: #ffffff;
}

#nav {
  background-color: darkcyan;
}

.fa{
  color: white;
}
</style>
