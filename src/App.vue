<template>
  <v-app class="overflow">
    <v-navigation-drawer
      class="d-none d-sm-flex"
      v-model="drawer"
      fixed
      
      color="secondary"
      app
    >
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="(item, key) in this.routes" :key="key">
            <v-list-item-content @click="routeTo(item.path)">
              <v-list-item-title v-text="item.title"> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="userInfo.isAdmin">
            <v-list-item-content @click="routeTo('/admin')">
              <v-list-item-title> Админ панель </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="secondary">
      <v-app-bar-nav-icon
        class="d-none d-sm-flex"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-img max-width="75" src="../public/img/icons/StartPageLogo.png" class=""></v-img>
      <v-toolbar-title @click="routeTo('/')" class="text-uppercase">Библиотека Кубита</v-toolbar-title>
      <v-spacer></v-spacer>
  
    </v-app-bar>

    <v-main class="secondary">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="d-none d-sm-flex secondary" padless app>
      <v-col cols="2"></v-col>
      <v-col class="text-center" cols="8">Сделано в Кубит</v-col>
      <v-col cols="2"></v-col>
    </v-footer>

    <v-footer class="d-sm-none justify-center" color="primary" padless app>
      <v-col class="text-center col-12 col-sm-6 d-flex justify-space-around">
        <div
          @click="routeTo('/')"
          class="d-flex flex-column justify-center navicons"
        >
          <span class="fi fi-rr-home"></span>
          <span class="icon_text">главная</span>
        </div>
        <div
          @click="routeTo('/books')"
          class="d-flex flex-column justify-center navicons"
        >
          <span class="fi fi-rr-align-justify"></span>
          <span class="icon_text">каталог</span>
        </div>

        <div
          v-if="user.loggedIn"
          @click="routeTo('/cabinet')"
          class="d-flex flex-column navicons"
        >
          <span class="fi fi-rr-user"></span>
          <span class="icon_text">кабинет</span>
        </div>
        <div
          v-else
          @click="routeTo('/auth')"
          class="d-flex flex-column text-center navicons"
        >
          <span class="fi fi-rr-user"> </span>
          <span class="icon_text">кабинет</span>
        </div>
        <div
          v-if="userInfo.isAdmin"
          @click="routeTo('/admin')"
          class="d-flex flex-column justify-center navicons"
        >
          <span class="fi fi-rr-edit"></span>
          <span class="icon_text">Админ</span>
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    dialog: false,

    routes: [
      {
        title: "Главная",
        path: "/",
      },
      {
        title: "Каталог",
        path: "/books",
      },
      {
        title: "Кабинет",
        path: "/cabinet",
      },
    ],
  }),
  methods: {
    routeTo: function (path) {
      this.$router.push(path).catch(()=>{});
      this.drawer = false;
    },

    ...mapActions(["getAllBooks", "getAllBookflow", "fetchUser"]),
  },
  computed: {
    ...mapGetters({
      user: "user",
      userInfo: "userInfo",
    }),
  },

  mounted() {
    this.getAllBooks();
    this.getAllBookflow();
    this.fetchUser(this.user);
  },
};
</script>
<style lang="scss">
.navicons {
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
}

.fi {
  font-size: 20px;
}
.icon_text {
  line-height: 1;
  font-size: 10px;
}

</style>