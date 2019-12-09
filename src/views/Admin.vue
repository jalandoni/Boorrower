<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key=""
    :search="search"
    class="elevation-5 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat class="ma-5 mb-12 pa-5">
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-center display-2">List of Borrowers</v-toolbar-title>
         <v-col cols="12" md="5">
         <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
         </v-col>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        x-small
        color="primary"
        :disabled="item.status == 'Return'"
        dark
        @click="actionBtn(item)"
      >{{item.action}}</v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-icon small @click="{alertDelete(item)}">mdi-delete</v-icon>
        </template>
       <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="menu(item, action.title)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:item.status="{ item }">
      <span>{{item.status}}</span>
    </template>
    <template v-slot:item.info="{ item }">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-icon small @click="details(item)" v-on="on">mdi-pencil</v-icon>
        </template>
        <v-card class="pa-4">
          <v-card-title class="black--text">
            <v-list-item-avatar tile right size="62">
              <img src="../assets/logo.png">
            </v-list-item-avatar>
            <span class="headline">Borrower Details</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Firstname</v-list-item-title>
              <v-text-field v-model="firstname" label="Name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Lastname</v-list-item-title>
              <v-text-field v-model="lastname" label="Lastname"></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Book ID</v-list-item-title>
              <v-text-field v-model="bookId" label="Book ID"></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Book Title</v-list-item-title>
              <v-text-field v-model="title" label="Title"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialog=false">close</v-btn>
            <v-btn color="blue darken-1" @click=" editBtn(item),dialog=false">save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.date="{ item }">
      <span>{{item.date.substr(0, 10)}}</span>
    </template>
  </v-data-table>
</template>

<script>
import {
  getBorrower,
  deleteBorrower,
  updateBorrower
} from "../helpers/actions";
import Swal from "sweetalert2";

export default {
  name: "Dashboard",
  data() {
    return {
      
      firstname: "",
      lastname: "",
      bookId:"",
      title:"",
      dueDate:"",
      borrowedDate:"",
      search: "",
      checked: false,
      expanded: [],
      clients: [],
      list: [],
      singleExpand: false,
      label: "Process",
      dialog: false,
      actions: [{ title: "Cancel" }, { title: "Delete" }],
      headers: [
        {
          text: "Firstname",
          align: "left",
          value: "firstname"
        },
        {
          text: "Lastname",
          value: "lastname"
        },

        {
          text: "Book Id",
          value: "bookId"
        },
        {
          text: "Book Title",
          value: "title"
        },
        {
          text: "Borrowed Date",
          value: "borrowedDate"
        },
        {
          text: "Due Date",
          value: "dueDate"
        },
        { text: "Comment", value: "status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "", value: "info" }
      ]
    };
  },
  methods: {
    filter() {
      this.clients.forEach(item => {
        if (item.status != "Pass") {
          this.list.push(item);
        }
      });
    },
    details(item) {
      console.log(item);
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.bookId=item.bookId;
      this.title=item.title;
      this.note = item.note;
    },

    deleteBorrower(item) {
      const index = this.clients.indexOf(item);
      const client = this.clients[index];

      console.log(client);
      deleteBorrower(client._id)
        .then(() => this.$emit("deleteBorrower", client._id))
        .catch(err => alert(err));
      this.retrieveBorrower();
    },

    retrieveBorrower() {
      getBorrower()
        .then(data => ((this.clients = data.data), console.log(data.data)))
        .catch(err => alert(err));
    },

    editBtn(item) {
      console.log(item);
        (item.firstname = this.firstname),
        (item.lastname = this.lastname),
        (item.bookId = this.bookId),
        (item.title = this.title);
      const data = {
        firstname: item.firstname,
        lastname: item.lastname,
        bookId: item.bookId,
        title: item.title
      };Swal.fire({
        title: "Information is Updated!",
        type: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay!",
        reverseButtons: true
      })
      updateBorrower(data, item._id)
        .then(data => {
          this.$emit("updateBorrower", data.data);
          this.retrieveBorrower();
        })
        .catch(err => alert(err));
    },
    actionBtn(item) {
      console.log(item);
      const index = this.clients.indexOf(item);
      const client = this.clients[index];
      if (item.status == "Borrowed") {
        item.action = "Return";
        item.status = "Book was borrowed";
      } else if (item.status == "Book was borrowed") {
        item.action = "Return";
        item.status = "Return";
      }
      const data = {
        status: client.status,
        check: client.check,
        action: client.action
      };
      updateBorrower(data, client._id)
        .then(data => {
          this.$emit("updateService", data.data);
          console.log(data.data);
        })
        .catch(err => alert(err.error));
    },
    alertDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteBorrower(item);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  },

  mounted() {
    getBorrower()
      .then(data => ((this.clients = data.data), console.log(data.data)))
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
.black--text label {
  color: black;
}
</style>