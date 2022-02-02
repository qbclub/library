<template>
  <div>
    <v-sheet class="d-flex justify-center align-center flex-column pa-10">
      <h2>Войти</h2>
      <v-container>
        <v-row class="align-center justify-center" no-gutters>
          <v-col cols="12" md="6">
            <form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                type="password"
                readonly
                onfocus="this.removeAttribute('readonly')"
                v-model="password"
                label="Password"
                required
              ></v-text-field>

              <v-btn class="mr-4" type="submit"> submit </v-btn>
              <v-btn> clear </v-btn>
            </form>
            <router-link to="/reg"
              ><p class="text-center ma-8">Зарегистрироваться</p></router-link
            >
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import router from "../router/index";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
import { mapActions } from "vuex";
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapActions(["fetchUser"]),
    submit() {
      this.fetchUser(this.email);
      return;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          router.push({ path: "/" });
        })
        .catch((err) => {
          router.push({ path: "/reg" });
          this.error = err.message;
        });
    },
  },
};
</script>

<style>
</style>