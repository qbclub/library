<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="BookName"
            label="Название книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookAnnotation"
            label="Краткое описание книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookPhoto"
            label="Фотография обложки"
            required
          ></v-text-field>

          <v-text-field
            v-model="AvtorName"
            label="Имя автора"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookTags"
            label="Теги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookYears"
            label="Год издательства книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookPlace"
            label="Расположение книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookISBN"
            label="Уникальный номер книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookPublish"
            label="Издатель книги"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookPageCount"
            label="Количество страниц"
            required
          ></v-text-field>

          <v-text-field
            v-model="BookSeries"
            label="Серия"
            required
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'Вы должны подтвердить чтобы продолжить!']"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import About from "../views/About.vue";
export default {
  components: { About },
  data: function () {
    return {
      form: {
        BookName: null,
        BookAnnotation: null,
        BookPhoto: null,
        AvtorName: null,
        BookTags: null,
        BookYears: null,
        BookPlace: null,
        BookISBN: null,
        BookPublic: null,
        BookPageCount: null,
        BookSeries: null,
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>