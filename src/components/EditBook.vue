<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        <v-form>

          <v-img
                contain
                :src="form.CoverPath"
                :max-height="150"
          ></v-img>

          <v-text-field
            v-model="form.Name"
            label="Название книги"
            required
          ></v-text-field>
          <v-textarea
            v-model="form.Annotation"
            label="Краткое описание книги"
            counter
            maxlength="1000"
            full-width
            required
          ></v-textarea>
          <v-row class="align-center">
            <v-col cols="6">
              <image-uploader
                :preview="false"
                accept="image/*"
                :scaleRatio="0.5625"
                :quality="0.96"
                :maxWidth="256"
                outputFormat="verbose"
                :className="['d-flex', 'flex-column']"
                @input="setImage"
                @onComplete="uploadImageComplete"
                @onUpload="uploadImageStart"
              >
                <label for="fileInput" slot="upload-label">
                  <div class="d-flex flex-column text-center">
                    <i class="fi fi-rr-camera text-h4 ma-0 d-inline"></i>

                    <span class="caption"> Фото <br /></span>
                  </div>
                </label>
              </image-uploader>
            </v-col>
          
            <v-col cols="6">
              <v-img
                contain
                v-if="cover.image"
                :src="cover.image"
                :height="cover.newHeight"
                :width="cover.newWidth"
              ></v-img>

              <v-sheet
                color="grey"
                min-height="200px"
                class="pa-3 d-flex justify-center align-center"
                v-if="!cover.image"
              >
                фото обложки
              </v-sheet>
            </v-col>
          </v-row>
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

          <v-btn class="mb-6 error" @click="send"> Отправить </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import About from "../views/About.vue";
import { mapActions } from "vuex";
import ImageUploader from "vue-image-upload-resize";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();

export default {
  components: { About, ImageUploader },
  data: function () {
    return {
      form: {
        Id: "",
        Name: "",
        Annotation: "",
        CoverPath: "",
        Authors: "",
        Sections: "",
        ReleaseDate: "",
        PhysicalPlace: "Калинина, 2а",
        ISBN: "",
        PublisherName: "",
        PageCount: "",
        Series: "",
        Status: "",
        TimeStamp: "",
      },
      cover: {
        newHeight: 0,
        newWidth: 0,
        image: null,
      },
    };
  },
  methods: {
    setImage: function (img) {
      // img - объект, содержащий много ифнормации об изображении
      this.cover.image = img.dataUrl;
      this.cover.newWidth = img.info.newWidth;
      this.cover.newHeight = img.info.newHeight;
    },
    uploadImageComplete: function () {
      this.form.Id = Date.now();
      const storageRef = ref(storage, "books/" + this.form.Id);
      uploadString(storageRef, this.cover.image, "data_url").then(
        (snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              this.form.CoverPath = url;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );

      console.log("UPLOAD COVER IMAGE FINISHED");
    },
    send: function () {
      this.updateBook(this.form);
    },
    uploadImageStart: function () {
      console.log("UPLOAD COVER IMAGE STARTED");
    },
    ...mapActions(["updateBook"]),
  },
  mounted() {
    this.form = this.$route.params
    this.cover.image = this.this.$route.params.CoverPath
    console.log(this.$route.params)
  }
};
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
</style>