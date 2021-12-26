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
          <p>Загрузите фотографию обложки</p>
          <image-uploader
            accept="image/*"
            :scaleRatio="0.5625"
            :quality="0.89"
            :maxWidth="256"
            outputFormat="verbose"
            :className="['d-flex', 'flex-column']"
            :preview="true"
            @input="setImage"
            @onComplete="uploadImageComplete"
            @onUpload="uploadImageStart"
          ></image-uploader>
          <p class="mt-4">Ваше изображение:</p>
          <br />
          <v-img
            :src="form.CoverPath"
            :height="cover.newHeight"
            :width="cover.newWidth"
          ></v-img>

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
import ImageUploader from "vue-image-upload-resize";
export default {
  components: { About, ImageUploader },
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
      cover: {
        newHeight: 0,
        newWidth: 0,
      },
      CoverPathImage: null,
      preImage: null,
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
    setImage: function (img) {
      console.log("INPUT");
      // img - объект, содержащий много ифнормации об изображении
      this.form.CoverPath = img.dataUrl;
      this.cover.newWidth = img.info.newWidth;
      this.cover.newHeight = img.info.newHeight;
      console.log(img);
    },
    uploadImageComplete: function () {
      console.log("UPLOAD FINISHED");
      // console.log(this.form.CoverPath);
    },
    uploadImageStart: function () {
      console.log("UPLOAD STARTED");
    },
    // uploadPhoto: function () {
    //   let vm = this;
    //   if (vm.form.CoverPath) {
    //     console.log(vm.form.CoverPath);
    //     const reader = new FileReader();
    //     reader.readAsDataURL(vm.form.CoverPath);

    //     // let preview = document.getElementById("img-pre");

    //     reader.onloadend = function () {
    //       vm.CoverPathImage = reader.result;
    //       vm.resizeImage(vm);
    //     };
    //   } else {
    //     console.log("No provided images");
    //   }
    // },
    resizeImage: async function (vm) {
      return;
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
  watch: {
    CoverPathImage: function (file) {
      return;
      if (!file) {
        this.image = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preImage = reader.result;
      };
    },
  },
};
</script>

<style>
</style>