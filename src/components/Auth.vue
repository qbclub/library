<template>
  <div>
    <div class="d-flex justify-center align-center flex-column pa-10 secondary">
      <h2>Войти</h2>
      <v-container>
        <v-row class="align-center justify-center" no-gutters>
          <v-col cols="12" md="6">
            <form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                label="E-mail"
                color="accent"
                required
              ></v-text-field>

              <v-text-field
                type="password"
                readonly
                onfocus="this.removeAttribute('readonly')"
                v-model="password"
                label="Password"
                color="accent"

                required
              ></v-text-field>
              <div class="d-flex justify-space-around">
                <v-btn text color="accent"  type="submit"> да </v-btn>
                <v-btn text color="error" > нет </v-btn>
              </div>
            </form>
            <router-link to="/reg"
              ><p class="text-center accent--text ma-8">
                Зарегистрироваться
              </p></router-link
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    submit() {
      let vm = this;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          router.push({ path: "/" });
          console.log("logged in with email: ", vm.email);
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