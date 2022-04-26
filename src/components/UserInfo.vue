<template>
  <v-container>
    <BackArrow></BackArrow>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        <h1 class="text-center">Информация</h1>
        <v-img
          v-if="form.PhotoPath"
          contain
          :src="form.PhotoPath"
          :max-height="150"
        ></v-img>
        <v-form>
          <v-row>
            <v-col cols="12" class="d-flex">
              <v-text-field
                v-model="form.Contacts.Email"
                label="Почта"
                required
                color="accent"
              >
              </v-text-field>
              <v-btn icon v-on:click="checkUser"
                ><i class="fi fi-rr-info"></i
              ></v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.FirstName"
                label="Имя"
                required
                color="accent"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.LastName"
                label="Фамилия"
                required
                color="accent"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.BirthDate"
                label="Дата рождения"
                required
                color="accent"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.EducationalInstitution"
                label="Учебное заведение"
                required
                color="accent"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.LivingAddress"
                label="Адрес проживания"
                required
                color="accent"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex align-center" cols="12" sm="6">
              <v-checkbox v-model="form.isAdmin"></v-checkbox>
              <span>{{ form.isAdmin ? "Администратор" : "Пользователь" }}</span>
            </v-col>
          </v-row>
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

                    <span class="caption"> фото <br /></span>
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
                пользователь
              </v-sheet>
            </v-col>
          </v-row>

          <h3 class="text-center">Контакты</h3>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.Contacts.PhoneNumber"
                label="Номер телефона"
                required
                color="accent"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.Contacts.SocCeti"
                label="Соц.сети"
                required
                color="accent"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn color="success" class="mb-10" @click="send">
              Отправить
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000" color="error">
      <div class="text-center">Пользователь не найден</div>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import About from "../views/About.vue";
import BackArrow from "./BackArrow.vue";
import ImageUploader from "vue-image-upload-resize";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();
import { mapGetters } from "vuex";

export default {
  components: { About, ImageUploader, BackArrow },
  data: function () {
    return {
      form: {
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
          Email: "",
          SocCeti: "",
        },
        PhotoPath: "",
      },

      cover: {
        newHeight: 0,
        newWidth: 0,
        image: null,
      },
      snackbar: false,
    };
  },
  methods: {
    clearingForm: function () {
      this.form = {
        UserId: "",
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        isAdmin: false,
        CurrentTakenBooks: [],
        CurrentReservedBooks: [],
        Contacts: {
          PhoneNumber: "",
          Email: "",
          SocCeti: "",
        },
        PhotoPath: "",
      };
    },
    send: async function () {
      const headers = {
        "content-type": "application/json",
      };

      this.updateUser(this.form);
      this.clearingForm();
      this.$router.push({ path: "/admin" });
    },
    checkUser: function (email) {
      axios
        .post(this.urlApiServer + "api/users/get-by-email", {
          email: this.form.Contacts.Email,
        })
        .then((response) => {
          if (response.data) {
            this.form.UserId = response.data.UserId;
            this.form.FirstName = response.data.FirstName;
            this.form.LastName = response.data.LastName;
            this.form.BirthDate = response.data.BirthDate;
            this.form.EducationalInstitution =
              response.data.EducationalInstitution;
            this.form.LivingAddress = response.data.LivingAddress;
            this.form.isAdmin = response.data.isAdmin;
            this.form.Contacts.PhoneNumber = response.data.Contacts.PhoneNumber;
            this.form.Contacts.SocCeti = response.data.Contacts.SocCeti;
            this.form.PhotoPath = response.data.PhotoPath;
          } else {
            this.snackbar = true;
          }
        })

        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    setImage: function (img) {
      // img - объект, содержащий много ифнормации об изображении
      this.cover.image = img.dataUrl;
      this.cover.newWidth = img.info.newWidth;
      this.cover.newHeight = img.info.newHeight;
    },
    uploadImageComplete: function () {
      const storageRef = ref(storage, "users/" + this.form.UserId);
      uploadString(storageRef, this.cover.image, "data_url").then(
        (snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              this.form.PhotoPath = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    },
    uploadImageStart: function () {
      console.log("UPLOAD STARTED");
    },
  },
  computed: {
    ...mapGetters(["urlApiServer"]),
  },
};
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
</style>