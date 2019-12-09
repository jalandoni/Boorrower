<template>
      <v-card class="ma-4 pa-5" height="100%">
        <v-card-title class="headline">
          <v-icon large class="mr-2">mdi-account</v-icon>
          Account Settings</v-card-title>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Username</v-list-item-title>
              <v-list-item-subtitle>{{username}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>{{password}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
          <v-list-item-content>
        <v-row justify="center">
    <v-dialog v-model="dialog1" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="light-blue darken-2" v-on="on" absolute right text>Edit Account</v-btn>
      </template>
                  <v-card>
                <v-card-title class="black--text">
                    <v-list-item-avatar tile right size="62">
            <img src="../assets/logo.png" />
          </v-list-item-avatar>
                <span class="headline">Admin Account</span>
                </v-card-title>
                <v-divider color="light-blue lighten-2"></v-divider>
                <v-card-text>
                    <v-container>
                        <v-form class="mt-10"
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy1"
                        >  <v-text-field v-model="username" :rules="inputRules" outlined dense  label="Username" required></v-text-field>
                            <v-text-field v-model="password" :rules="inputRules" outlined dense label="Password" required></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1= false">Cancel</v-btn>
                <v-btn color="blue darken-1" text :disabled="!valid" @click="updateAccount">Save</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </v-row>
         </v-list-item-content>
         </v-list-item>
        </v-list>
        
      </v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: "accountSettings",
  data() {
    return {
      username: "",
      password: "",
      dialog1: false,
      dialog2: false,
      notifications: false,
      sound: true,
      widgets: false,
      data: 0,
      lazy1: false,
      lazy2: false,
      valid: false,
        inputRules: [
            v => !!v || 'Input is required'
        ],
    };
  },
  methods: {
    updateAccount() {
      axios.put("http://localhost:3000/admin/update", {
        data: { username: localStorage.getItem('user'), newusername : this.username, newpassword: this.password }
      })
        .then(response => {
          this.$emit("updateAccount", response.data);
          console.log(response.data.data);
          localStorage.setItem('user', response.data.data.username)
          this.$router.push('Settings')
        })
        .catch(err => alert(err.error));
    },
    close() {
      this.dialog2 = false;
      console.log(this.data);
      this.hours = this.data;
    }
  },
  mounted() {
  }
};
</script>