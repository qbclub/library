<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Name"
            label="Имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="SecondName"
            label="Фамилия"
            required
          ></v-text-field>

          <v-text-field
            v-model="Email"
            label="Почта"
            required
          ></v-text-field>

           <v-text-field
            v-model="Password"
            label="Придумайте пароль"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Отправка
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>