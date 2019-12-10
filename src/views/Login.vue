<template>   
<v-app id="back">
  <v-container class="fill-height" fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md7 lg5>
        <v-row align="center" justify="center">
          <v-img
            src="../assets/logo.png"
            aspect-ratio="1"
            max-width="200"
            max-height="200"
          ></v-img>
        </v-row>
        <v-spacer />
        <v-card  class="mx-auto" color="rgb(255, 255, 255, 0.2)" max-width="500px" raised>
           <v-toolbar
                color="rgb(255, 255, 255, 0.2)"
                dark
                flat
              >
           </v-toolbar>
                <v-spacer />
          <v-card-title>
            <h3>ADMIN LOGIN</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Login"
                name="username"
                prepend-icon="mdi-account"
                color="indigo"
                clearable
                type="text"
              />

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                clearable
                color="indigo"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-spacer />
          <v-card-actions class="justify-center">
            <v-btn
              class="px-10"
              text
              v-on:click="login()"
              text-center
              color="light-blue darken-4"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
 </v-app>
</template>
 
<script>
export default {
  name: "btnLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username == "admin" && this.password == "admin") {
        sessionStorage.setItem("authenticated", true);
        this.$store.commit("setAuthentication", true);
        this.$router.push({ name: "Dashboard" });
      } else {
        alert("Invalid credentials");
      }
    }
  },
 
};
</script>
<style scoped>
h2 {
  color: black;
}

#back {
  background-image: url("../assets/lib.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>