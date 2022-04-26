<template>
  <div>
    <div class="d-flex align-center flex-column pa-10 secondary">
      <h2>Регистрация</h2>

      <v-container>
        <v-row class="align-center justify-center" no-gutters>
          <v-col cols="12" md="6">
            <validation-observer ref="observer">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    v-model="name"
                    :error-messages="errors"
                    label="Name"
                    color="accent"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    color="accent"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <v-text-field
                    type="password"
                    readonly
                    onfocus="this.removeAttribute('readonly')"
                    v-model="password"
                    color="accent"
                    minlength="6"
                    :error-messages="errors"
                    label="Password"
                  ></v-text-field>
                </validation-provider>

                <div class="d-flex justify-space-around">
                  <v-btn text color="accent" type="submit"> да </v-btn>
                  <v-btn text color="error" @click="clear"> нет </v-btn>
                </div>

                <div>{{ error }}</div>
              </form>
              <router-link to="/auth"
                ><p class="text-center accent--text ma-8">Войти</p></router-link
              >
            </validation-observer>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
// import router from "../router/index";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const auth = getAuth();

import { mapActions } from "vuex";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: null,
    email: null,
    password: null,
    error: null,
  }),

  methods: {
    ...mapActions(["createUser"]),
    submit() {
      this.$refs.observer.validate().then(this.userReg());
      setTimeout(this.clear, 1000);
    },
    clear() {
      this.name = "";
      this.password = "";
      this.email = "";
      this.$refs.observer.reset();
    },
    userReg: async function () {
      let vm = this;
      let user = {
        UserId: Date.now(),
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        isAdmin: false,
        CurrentTakenBooks: "",
        CurrentReservedBooks: "",
        Contacts: {
          PhoneNumber: "",
          Email: this.email,
          SocCeti: "",
        },
        PhotoPath: "",
      };

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          vm.createUser(user);

          updateProfile(data.user, {
            displayName: vm.name,
          })
            .then(async () => {
              this.$router.push("/books").catch(() => {});
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
          this.error = err.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>