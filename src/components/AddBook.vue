<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        <v-form>
          <v-text-field
            v-model="form.Name"
            label="Название книги"
            required
          ></v-text-field>

          <v-textarea
            v-model="form.Annotation"
            label="Краткое описание книги"
            counter
            maxlength="300"
            full-width
          ></v-textarea>

          <v-text-field
            v-model="form.CoverPath"
            label="Фотография обложки"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.Authors"
            label="Имя автора"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.Sections"
                label="Теги"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.ReleaseDate"
                label="Год издания книги"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="form.PhysicalPlace"
            label="Расположение книги"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.ISBN"
                label="Уникальный номер книги"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.PublisherName"
                label="Издатель книги"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.PageCount"
                label="Количество страниц"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="form.Series"
                label="Серия"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'Вы должны подтвердить чтобы продолжить!']"
            label="Вы уверены?"
            required
          ></v-checkbox> -->

          <v-btn color="success" class="mr-4" @click="send"> Отправить </v-btn>

          <!-- <v-btn color="error" class="mr-4" @click="reset"> Сброс </v-btn> -->
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import About from "../views/About.vue";
import axios from "axios";
export default {
  components: { About },
  data: function () {
    return {
      form: {
        Name: null,
        Annotation: null,
        CoverPath: null,
        Authors: null,
        Sections: null,
        ReleaseDate: null,
        PhysicalPlace: null,
        ISBN: null,
        PublisherName: null,
        PageCount: null,
        Series: null,
      },
    };
  },
  methods: {
    clearingForm: function () {
      this.form = {
        Name: null,
        Annotation: null,
        CoverPath: null,
        Authors: null,
        Sections: null,
        ReleaseDate: null,
        PhysicalPlace: null,
        ISBN: null,
        PublisherName: null,
        PageCount: null,
        Series: null,
      };
    },
    send: function () {
     
      axios
        .post(
          "http://localhost:8080/api/books/create",
          JSON.stringify(this.form),
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response);
          this.clearingForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>