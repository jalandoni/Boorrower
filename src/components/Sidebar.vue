
<template>
  <v-card hover fixed width="200">
    <v-navigation-drawer
      absolute
      src="https://t4.ftcdn.net/jpg/02/91/29/11/240_F_291291138_nN2lKbL798fhCGFzLcpgHa1kVy1xvh3Y.jpg"
      width="100%"
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="(item, index) in items" 
            :key="index" 
            :to="item.link"
            >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "mdi-view-dashboard", title: "Dashboard", link: "/admin" },
      { icon: "mdi-timetable", title: "Services", link: "/services" },
      { icon: "mdi-account-multiple", title: "Pass", link: "/pass" },
      { icon: "mdi-account", title: "Account", link: "/account" }
    ]
  })
};
</script>
