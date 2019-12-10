<template>
  <v-card class="my-4 mx-auto px-10 pb-10" max-width="35%" elevation="5">
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-row>
         <v-col cols="12" md="9">
              <h3 class="mb-15"></h3>
              </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="firstname" @keypress="onlyLetter" :rules="nameRules" label="First name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="lastname"  @keypress="onlyLetter" :rules="nameRules" label="Last name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="bookId" @keypress="onlyNumber" :rules="nameRules"  label="Book Id" required></v-text-field>

        </v-col>
         <v-col cols="12" md="12">
      <v-text-field v-model="title" label="Book Title" :rules="nameRules" required></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Please check the box if all details were fill in!"
        required
      ></v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">Request</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { createBorrower } from "../helpers/actions";
import Swal from "sweetalert2";
let current_datetime = new Date()
var date = new Date();
date.setDate(date.getDate() + 7);
let formatted_date1 = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
let formatted_date2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() 



export default {
  name: "Add",
  data: () => ({
    status: "Borrowed",
    action: "Borrowed Book",
    borrowedDate: formatted_date1,
    dueDate:  formatted_date2 ,
    valid: true,
    firstname: "",
    lastname: "",
    bookId: "",
    title: "",
    hours: [],
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    selectService: null,
    services: [],
    date: null,
    currentDate: new Date().toISOString().substr(0, 10),
    modal: false,
    checkbox: false,
    lazy: false,
    dataHours: [],
    disable: true
  }),

  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    onlyLetter($event) {
      if (
        (event.charCode > 64 && event.charCode < 91) ||
        (event.charCode > 96 && event.charCode < 123)
      ) {
        return true;
      } else {
        $event.preventDefault();
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.firstname = this.lastname = this.bookId = this.title = null;
        this.checkbox = false;
        this.snackbar = true;
        this.$refs.form.reset();
      }
    },

    submitRequest() {
      if (this.note == "") {
        this.note = "No note is added!";
      }
      let data = {
        firstname: this.firstname.charAt(0).toUpperCase() +
          this.firstname.slice(1).toLowerCase(),
        lastname: this.lastname.charAt(0).toUpperCase() +
          this.lastname.slice(1).toLowerCase(),
        bookId:this.bookId,
        title:this.title.charAt(0).toUpperCase() +
          this.title.slice(1).toLowerCase(),
        borrowedDate: this.borrowedDate,
        dueDate: this.dueDate,
        status: this.status,
        action: this.action
      };
       Swal.fire({
        title: "Information was successfully added to the List of Borrowers",
        type: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
        reverseButtons: true
      })
      createBorrower(data)
        .then(data => {
          this.$emit("createBorrower", data.data);
        })
        .catch(err => alert(err.error));
    }
  },
  mounted() {}
};
</script>
<style>
.v-sheet--offset {
  top: -25px;
  position: relative;
}
</style>