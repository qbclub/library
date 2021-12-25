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
            required
          ></v-textarea>
          <v-form>
            <v-file-input
              label="Фотография обложки"
              v-model="form.CoverPath"
              required
              accept="image/*"
            ></v-file-input>
            <v-btn @click="uploadPhoto">загрузить</v-btn>
            <canvas id="preview-on-canvas"></canvas>
            <v-divider></v-divider>
            <div id="img-pre" />
          </v-form>

          <!-- <canvas id="preview-image"></canvas>
          <div id="testing"></div> -->

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
      example: {
        Id: 5,
        Annotation: "party",
        Name: "food1",
        TableOfContents: "Table",
        CoverPath: "http://google.com",
        Authors: ["Jacey", "Taylor", "Mary"],
        Sections: ["Javascript", "Java"],
        Status: "Ready",
        ReservedQueue: [1, 2],
        TemporaryOwner: "Vlad",
        DateOfGivenOut: "2021-12-21T23:25:27.338Z",
        ReleaseDate: "2021-12-21T23:25:27.338Z",
        TimeStamp: "2021-12-21T23:25:27.338Z",
        PhysicalPlace: "path to zhopa",
        ISBN: "123456",
        PublisherName: "Alpina",
        PageCount: 234,
        Series: 515,
      },
      form: {
        Name: "",
        Annotation: "",
        CoverPath: "",
        Authors: "",
        Sections: "",
        ReleaseDate: "",
        PhysicalPlace: "",
        ISBN: "",
        PublisherName: "",
        PageCount: "",
        Series: "",
        Id: "",
        Status: "",
        TimeStamp: "",
      },
      CoverPathImage: null,
      editedImage: null,
    };
  },
  methods: {
    clearingForm: function () {
      this.form = {
        Name: "",
        Annotation: "",
        CoverPath: "",
        Authors: "",
        Sections: "",
        ReleaseDate: "",
        PhysicalPlace: "",
        ISBN: "",
        PublisherName: "",
        PageCount: "",
        Series: "",
        Id: "",
        Status: "",
        TimeStamp: "",
      };
    },
    send: function () {
      const headers = {
        "content-type": "application/json",
      };

      axios
        .post("http://localhost:8080/api/books/create", this.form, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          this.clearingForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadPhoto: function () {
      let vm = this;
      if (vm.form.CoverPath) {
        console.log(vm.form.CoverPath);
        const reader = new FileReader();
        reader.readAsDataURL(vm.form.CoverPath);

        // let preview = document.getElementById("img-pre");

        reader.onloadend = function () {
          vm.CoverPathImage = reader.result;
          vm.resizeImage(vm);
        };
      } else {
        console.log("No provided images");
      }
    },
    resizeImage: async function (vm) {
      const width = 400;
      const height = 500;
      const canvas = document.getElementById("preview-on-canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      let img = new Image(width, height);
      img.src = vm.CoverPathImage;
      if (img.complete) {
        ctx.drawImage(img, 0, 0);
      } else {
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
        };
      }
      const data = await canvas.toDataURL("image/jpeg", 0.1);
      const editedImg = new Image();
      // if (data.complete) {
      //   editedImg.src = data;
      // } else {
      //   data.onload = function () {

      //   };
      // }
      editedImg.src = data;
      const editedImagePreview = document.getElementById("img-pre");
      if (editedImg.complete) {
        // console.log(editedImg);
        editedImagePreview.appendChild(editedImg);
      } else {
        editedImg.onload = function () {
          // console.log(editedImg);
          editedImagePreview.appendChild(editedImg);
        };
      }

      return;
      if (this.form.CoverPath) {
        const reader = new FileReader();
        reader.readAsDataURL(this.form.CoverPath);
        // const fileName = this.form.CoverPath.name.replace(/\.[^/.]+$/, "");

        reader.onload = (event) => {
          const width = 200;
          const height = 1000;
          const img = new Image(width, height);
          img.src = event.target.result;
          let test = document.getElementById("testing");

          let canvas = document.getElementById("preview-image");

          // canvas.width = width;
          // canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const data = canvas.toDataURL("image/png", 0.7);
          this.previewImage = data;
          // console.log(data);
          // ctx.canvas.toBlob(
          //   (blob) => {
          //     // console.log(blob); //output image as a blob
          //     const file = new File([blob], fileName + ".jpeg", {
          //       type: "image/jpeg",
          //       lastModified: Date.now(),
          //     }); //output image as a file
          //     /**Файл есть, осталось его сохранить */

          //   },
          //   "image/jpeg",
          //   0.7
          // );
        };
      } else {
        console.log("No CoverPath images provided");
      }
    },
  },
};
</script>

<style>
</style>