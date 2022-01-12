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
      <!-- select backend -->
      <v-select
        v-model="chosenBackend"
        :items="backends"
        label="Backend"
        class="ma-4"
      ></v-select>
      <!-- select backend -->
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll>
      <v-app-bar-nav-icon
        class="d-none d-sm-flex"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="routeTo('/')">Библиотека</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex">
        <template v-if="user.loggedIn">
          <div class="d-flex flex-column text-center navicons">
            <i @click.stop="dialog = true" class="fi fi-rr-sign-out"> </i>
            <span class="icon_text">выход</span>
          </div>
        </template>
        <template v-else>
          <div
            v-on:click="routeTo('/auth')"
            class="d-flex flex-column text-center navicons"
          >
            <i class="fi fi-rr-sign-in"> </i>
            <span class="icon_text">вход</span>
          </div>
        </template>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="d-none d-sm-flex" padless app>
      <v-col cols="2"></v-col>
      <v-col class="text-center" cols="8">Сделано в Кубит</v-col>
      <v-col cols="2"></v-col>
    </v-footer>

    <v-footer class="d-sm-none justify-center" padless app>
      <v-col class="text-center col-12 col-sm-6 d-flex justify-space-around">
        <div
          @click="routeTo('/')"
          class="d-flex flex-column justify-center navicons"
        >
          <span class="fi fi-rr-align-justify"></span>
          <span class="icon_text">главная</span>
        </div>
        <div @click="routeTo('/')" class="d-flex flex-column navicons">
          <span class="fi fi-rr-bookmark"></span>
          <span class="icon_text">закладки</span>
        </div>
        <div @click="routeTo('/')" class="d-flex flex-column navicons">
          <span class="fi fi-rr-search"></span>
          <span class="icon_text">поиск</span>
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
          <span class="fi fi-rr-sign-in"> </span>
          <span class="icon_text">вход</span>
        </div>
      </v-col>
    </v-footer>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title> Выйти из приложения? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="dialog = false"> Нет </v-btn>

          <v-btn text @click.prevent="signOut"> Да </v-btn>
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
    backends: ["node", "firebase", "cooming soon"],
    chosenBackend: "firebase",
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
  watch: {
    chosenBackend: function () {
      this.$store.state.app.currentBackend = this.chosenBackend;
    },
  },
};
</script>
<style lang="scss">
@import url("./assets/style/style.scss");
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