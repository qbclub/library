<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <div class="md-layout-item md-size-40 md-small-size-100">
      <v-form ref="form" v-model="valid" lazy-validation>
         <v-text-field
          v-model="BookName"
          :rules="nameRules"
          label="Название книги"
          required
        ></v-text-field>

        <v-text-field
          v-model="BookName"
          :rules="nameRules"
          label="Имя Автора"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Вы уверены?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Отправка
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Сброс </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        BookName: null,
        AvtorName: null,
        BookYears: null,
        BookPhoto: null,
        BookDescription: null,
        BookGenres: null,
      },
    };
  },
  methods: {
    clearForm: function () {
      this.form.BookName = null;
      this.form.AvtorName = null;
      this.form.BookYears = null;
      this.form.BookPhoto = null;
      this.form.BookDescription = null;
      this.form.BookGenres = null;
    },
  },
};
</script>

<style>
</style>