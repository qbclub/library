<template>
  <v-app>
    <v-navigation-drawer
      class="d-none d-sm-flex"
      v-model="drawer"
      fixed
      temporary
      app
    >
      <v-list nav>
        <!-- active-class="deep-purple--text text--accent-4" -->
        <v-list-item-group>
          <v-list-item v-for="(item, key) in this.routes" :key="key">
            <v-list-item-content @click="routeTo(item.path)">
              <v-list-item-title v-text="item.title"> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll>
      <v-app-bar-nav-icon
        class="d-none d-sm-flex"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="routeTo('/')">Библиотека</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="user.loggedIn">
        <div class="d-flex flex-column text-center navicons">
          <i @click.stop="dialog = true" class="fi fi-rr-sign-out ">
          </i>
          <span class="text-caption">выход</span>
        </div>
      </template>
      <template v-else>
        <div class="d-flex flex-column text-center navicons">
          <i v-on:click="routeTo('/auth')" class="fi fi-rr-sign-in ">
          </i>
          <span class="text-caption">вход</span>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="d-none d-sm-flex" padless app>
      <v-col cols="2"></v-col>
      <v-col class="text-center" cols="8">With Love, from Qbit</v-col>
      <v-col cols="2"></v-col>
    </v-footer>

    <v-footer height="49px" class="d-flex d-sm-none" app>
      <v-row class="align-center justify-center">
        <v-col
          cols="3"
          @click="routeTo('/')"
          class="d-flex flex-column text-center navicons"
        >
          <i class="fi fi-rr-align-justify"></i>
          <span class="text-caption">главная</span>
        </v-col>
        <v-col
          cols="3"
          @click="routeTo('/')"
          class="d-flex flex-column text-center navicons"
        >
          <i class="fi fi-rr-bookmark"></i>
          <span class="text-caption">закладки</span>
        </v-col>
        <v-col
          cols="3"
          @click="routeTo('/')"
          class="d-flex flex-column text-center navicons"
        >
          <i class="fi fi-rr-search"></i>
          <span class="text-caption">поиск</span>
        </v-col>
        <v-col
          cols="3"
          @click="routeTo('/cabinet')"
          class="d-flex flex-column text-center navicons"
        >
          <i class="fi fi-rr-user"></i>
          <span class="text-caption">пользователь</span>
        </v-col>
        <v-col
          cols="3"
          @click="routeTo('/userinfo')"
          class="d-flex flex-column text-center navicons"
        >
          <i class="fi fi-rr-info"></i>
          <span class="text-caption">Информация о пользователе</span>
        </v-col>
      </v-row>
    </v-footer>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title> Выйти из приложения? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="accent" text @click="dialog = false"> Нет </v-btn>

          <v-btn color="primary" text @click.prevent="signOut"> Да </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    dialog: false,
    routes: [
      {
        title: "Каталог",
        path: "/",
      },
      {
        title: "Личный кабинет",
        path: "/cabinet",
      },
      {
        title: "AddBook",
        path: "/addbook",
      },
      {
        title: "Регистрация",
        path: "/reg",
      },
      {
        title: "Аутентификация",
        path: "/auth",
      },

      {
        title: "Движение книг",
        path: "/eventList",
      },
      {
        title: "Информация о пользователе",
        path: "/userinfo",
      },
    ],
  }),
  methods: {
    routeTo: function (path) {
      this.$router.push(path);
      this.drawer = false;
    },
    signOut: function () {
      signOut(getAuth())
        .then(() => {
          this.$router.replace({
            name: "EventList",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.dialog = false;
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
<style lang="scss">
@import url("./assets/style/style.scss");
.navicons {
  cursor: pointer;
}
</style>