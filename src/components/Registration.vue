<template>
  <div>
    <v-sheet class="d-flex align-center flex-column">
      <h2>Регистрация</h2>
      <v-container>
        <v-row class="align-center justify-center" no-gutters>
          <v-col cols="12" md="6">
            <validation-observer ref="observer" v-slot="{ invalid }">
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
                    required
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
                    required
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
                    minlength="6"
                    :error-messages="errors"
                    label="Password"
                    required
                  ></v-text-field>
                </validation-provider>

                <v-btn class="mr-4" type="submit" :disabled="invalid">
                  submit
                </v-btn>
                <v-btn @click="clear"> clear </v-btn>
              </form>
            </validation-observer>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
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
    userReg() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log(data);
          data.user.updateProfile({
            displayName: this.name,
          });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>