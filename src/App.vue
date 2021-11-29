<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed temporary app>
      <v-list nav>
        <!-- active-class="deep-purple--text text--accent-4" -->
        <v-list-item-group v-for="(item, key) in this.routes" :key="key">
          <v-list-item>
            <v-list-item-title @click="routeTo(item.path)" v-text="item.title">
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll
      ><v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="routeTo('/')" style="cursor: pointer"
        >Библиотека</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer padless app>
      <v-col cols="2"></v-col>
      <v-col class="text-center" cols="8">With Love, from Qbit</v-col>
      <v-col cols="2"></v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    routes: [
      {
        title: "route 1",
        path: "/",
      },
      {
        title: "route 2",
        path: "/",
      },
    ],
  }),
  methods: {
    routeTo: function (path) {
      this.$router.push(path);
      this.drawer = false;
    },
  },
};
</script>
